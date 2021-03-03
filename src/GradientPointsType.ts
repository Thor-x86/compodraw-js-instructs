/**
 * Used for represents gradient color points
 * at GradientLinear and GradientRadial.
 *
 * @example
 * const myGradientPoints: GradientPointsType = {
 *     0.00 : "#ff0000",
 *     0.64 : "#00ff00",
 *     1.00 : "#0000ff"
 * }
 */
export type GradientPointsType = { [key: number]: string };

export default GradientPointsType;
