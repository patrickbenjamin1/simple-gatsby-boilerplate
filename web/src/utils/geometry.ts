/* eslint-disable @typescript-eslint/no-use-before-define */

import { MathsUtils } from './maths'

export namespace Geometry {
  export interface Point {
    x: number
    y: number
  }

  export namespace Points {
    export const getDistanceBetweenPoints = (a: Point, b: Point) => {
      const x = b.x - a.x
      const y = b.y - a.y

      return Trigonometry.getHypotenuseFromXY(x, y)
    }

    /** return the distance between two points and also that distance in x and y (miniscule optimisation that saves a couple calculations but at scale might make some difference) */
    export const getDistanceBetweenPointsAndXY = (a: Point, b: Point) => {
      const x = b.x - a.x
      const y = b.y - a.y

      return { distance: Trigonometry.getHypotenuseFromXY(x, y), distanceX: x, distanceY: y }
    }

    export const getCentre = (points: Point[]): Point => {
      return { x: MathsUtils.getMidpoint(points.map((point) => point.x)), y: MathsUtils.getMidpoint(points.map((point) => point.y)) }
    }
  }

  export namespace LinearEquations {
    /** utils for gradient-intercept form representation of a linear function written `y = gradient * x + intercept` (or `y = mx + y0`) */
    export namespace GradientIntercept {
      /** gradient-intercept form representation of a linear function written `y = gradient * x + intercept` (or `y = mx + y0`) */
      export interface GradientInterceptEquation {
        gradient: number
        intercept: number
      }

      export const getForTwoPoints = (a: Point, b: Point) => {
        const gradient = (b.y - a.y) / (b.x - a.x)
        const intercept = a.y - a.x * gradient

        return { gradient, intercept }
      }

      export const getYForX = (gradientIntercept: GradientInterceptEquation, x: number) => {
        const { gradient, intercept } = gradientIntercept
        return gradient * x + intercept
      }

      export const getXForY = (gradientIntercept: GradientInterceptEquation, y: number) => {
        const { gradient, intercept } = gradientIntercept
        return (y - intercept) / gradient
      }

      export const getThirdYForX = (a: Point, b: Point, x: number) => {
        const gradientIntercept = getForTwoPoints(a, b)

        return getYForX(gradientIntercept, x)
      }

      export const getThirdXForY = (a: Point, b: Point, y: number) => {
        const gradientIntercept = getForTwoPoints(a, b)

        return getXForY(gradientIntercept, y)
      }
    }
  }

  export namespace Circles {
    /** get the circumference of a circle for a radius */
    export const getCircumferenceByRadius = (radius: number) => Math.PI * radius * 2

    /** get the area of a circle for a radius */
    export const getAreaByRadius = (radius: number) => Math.PI * radius ** 2

    /** get the radius of a circle from its diameter */
    export const getRadiusByDiameter = (diameter: number) => diameter * 0.5
    export const getDiameterByRadius = (radius: number) => radius * 2
  }

  export namespace Trigonometry {
    /** counter clockwise from x line */
    export const getAngleFromXY = (x: number, y: number) => Math.atan2(y, x)

    export const getHypotenuseFromXY = (x: number, y: number) => Math.abs(Math.sqrt(x ** 2 + y ** 2))
  }

  export namespace Angle {
    export const radiansToDegrees = (radians: number) => (radians * 180) / Math.PI
    export const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180
  }
}
