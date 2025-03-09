import { createAnimation } from '@ionic/vue';

export const myCustomTransition = (_, opts) => {
  const enteringPage = opts.enteringEl;
  const leavingPage = opts.leavingEl;

  const enterAnimation = createAnimation()
    .addElement(enteringPage)
    .duration(500)
    .fromTo('opacity', '0', '1');

  const leaveAnimation = createAnimation()
    .addElement(leavingPage)
    .duration(500)
    .fromTo('opacity', '1', '0');

  return createAnimation().addAnimation([enterAnimation, leaveAnimation]);
};
