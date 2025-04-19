from django.shortcuts import render, HttpResponse
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Order
from .serializer import OrderSerializer

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the order index.")

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        instance = serializer.instance
        if instance.status != 'pending':
            return Response(
                {"error": "Seules les commandes 'en attente' peuvent être modifiées"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save()

    def perform_destroy(self, instance):
        if instance.status != 'pending':
            return Response(
                {"error": "Seules les commandes 'en attente' peuvent être supprimées"},
                status=status.HTTP_400_BAD_REQUEST
            )
        instance.delete()
