import { Arrays } from '@rocketmakers/armstrong-edge'

import { MathsUtils } from './maths'

export namespace SVG {
  export type Point = {
    x: number
    y: number
  }

  export namespace PathCommands {
    export type Move = Point & {
      command: 'M'
    }
    export type RelativeMove = Point & {
      command: 'm'
    }
    export type LineTo = Point & {
      command: 'L'
    }
    export type RelativeLineTo = Point & {
      command: 'l'
    }
    export type Horizontal = {
      value: number
      command: 'H'
    }
    export type RelativeHorizontal = {
      value: number
      command: 'h'
    }
    export type Vertical = {
      value: number
      command: 'V'
    }
    export type RelativeVertical = {
      value: number
      command: 'v'
    }
    export type CubicBezier = Point & {
      command: 'C'
      startControlPoint: Point
      endControlPoint: Point
    }
    export type RelativeCubicBezier = Point & {
      command: 'c'
      startControlPoint: Point
      endControlPoint: Point
    }
    export type SmoothCubicBezier = Point & {
      command: 'S'
      endControlPoint: Point
    }
    export type RelativeSmoothCubicBezier = Point & {
      command: 's'
      endControlPoint: Point
    }
    export type Close = {
      command: 'z'
    }
    // todo, fill in other commands
  }

  export type PathCommand =
    | PathCommands.Move
    | PathCommands.RelativeMove
    | PathCommands.LineTo
    | PathCommands.RelativeLineTo
    | PathCommands.Horizontal
    | PathCommands.RelativeHorizontal
    | PathCommands.Vertical
    | PathCommands.RelativeVertical
    | PathCommands.CubicBezier
    | PathCommands.RelativeCubicBezier
    | PathCommands.SmoothCubicBezier
    | PathCommands.RelativeSmoothCubicBezier
    | PathCommands.Close

  export const pathCommandToString = (pathCommand: PathCommand) => {
    switch (pathCommand.command) {
      case 'H':
      case 'h':
      case 'V':
      case 'v':
        return `${pathCommand.command} ${pathCommand.value}`
      case 'M':
      case 'm':
      case 'L':
      case 'l':
        return `${pathCommand.command} ${pathCommand.x}, ${pathCommand.y}`
      case 'C':
      case 'c':
        return `${pathCommand.command} ${pathCommand.startControlPoint.x},${pathCommand.startControlPoint.y} ${pathCommand.endControlPoint.x},${pathCommand.endControlPoint.y} ${pathCommand.x},${pathCommand.y}`
      case 'S':
      case 's':
        return `${pathCommand.command} ${pathCommand.endControlPoint.x},${pathCommand.endControlPoint.y} ${pathCommand.x},${pathCommand.y}`
      case 'z':
        return `${pathCommand.command}`
      default:
        return ''
    }
  }

  export const getPathData = (commands: PathCommand[]) => {
    return commands.map((command) => pathCommandToString(command)).join(' ')
  }

  export const getClosedPathFromPoints = (points: Point[]) => {
    return getPathData([...points.map<PathCommand>((point, index) => ({ command: index === 0 ? 'M' : 'L', ...point })), { command: 'z' }])
  }

  export const getViewBox = (width: number, height: number, topLeft: Point = { x: 0, y: 0 }) =>
    `${topLeft.x} ${topLeft.y} ${topLeft.x + width} ${topLeft.y + height}`

  export const getHorizontalSineWaveCommands = (waves: number, xDistance: number, yDisplacement: number): PathCommand[] => {
    const waveLength = MathsUtils.roundToDecimalPlaces(xDistance / waves, 3)

    const pathsCommands = Arrays.repeat<PathCommand[]>(waves, () => [
      {
        command: 'c',
        x: waveLength * 0.5,
        y: yDisplacement,
        startControlPoint: { x: waveLength * 0.25, y: 0 },
        endControlPoint: { x: waveLength * 0.25, y: yDisplacement },
      },
      {
        command: 'c',
        x: waveLength * 0.5,
        y: -yDisplacement,
        startControlPoint: { x: waveLength * 0.25, y: 0 },
        endControlPoint: { x: waveLength * 0.25, y: -yDisplacement },
      },
    ])

    return pathsCommands.reduce((commands, output) => [...output, ...commands], [])
  }
}
