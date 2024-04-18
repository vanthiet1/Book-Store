import { useState  } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';


const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});

const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg)`;

const Card = ({ data }) => {

  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(),
  }));

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;
    if (!down && trigger) gone.add(index);
    api.start((i) => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1;
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      };
    });
    if (!down && gone.size === data.length)
      setTimeout(() => {
        gone.clear();
        api.start((i) => to(i));
      }, 600);
  });

  return (
    <>
      {props.map(({ x, y, rot }, i) => (
        <animated.div className="relative" key={i} style={{ x, y }}>
          <animated.div
            {...bind(i)}
            className="absolute w-64 h-96 bg-cover rounded-lg left-[40%] top-[50px]"
            style={{
              transform: rot.to(trans),
              backgroundImage: `url(${data[i]?.imgBook})`,
            }}
          />
        </animated.div>
      ))}
    </>
  );
};

export default Card;
