/**
 * Calculates the velocity of an object given its initial velocity,
 * acceleration, and time.
 */
export const velocity = (
  initialVelocity: number,
  acceleration: number,
  time: number,
) => initialVelocity + acceleration * time

/**
 * Calculates the displacement of an object given its initial displacement,
 * initial velocity, acceleration, and time.
 */
export const displacement = (
  initialDisplacement: number,
  initialVelocity: number,
  acceleration: number,
  time: number,
) =>
  initialDisplacement +
  initialVelocity * time +
  (acceleration * time * time) / 2
