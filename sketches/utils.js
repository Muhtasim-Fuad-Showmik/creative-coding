/**
 * Function to convert angles from degrees to radians
 * 
 * @param {int} degrees angle measured in degrees to be converted to rad
 * @returns rad angle value converted from the provided degree angle
 */
export const degToRad = (degrees) => {
  return degrees * (Math.PI / 180);
};