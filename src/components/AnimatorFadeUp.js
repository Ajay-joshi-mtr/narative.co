import React, { Component } from 'react'
import { isMobile } from 'react-device-detect'
import Observer from './Observer'

class AnimatorFadeUp extends Component {
  calculateStyleCurves = ({ intersectionRatio, exiting }) => {
    console.log({ isMobile })
    if (isMobile) {
      return {
        opacity: 1,
        transform: 0,
      }
    }

    // To avoid NaN errors, return out if there's no intersectionRatio
    if (!intersectionRatio) {
      return { opacity: 0, transform: 0 }
    }

    const opacityCurve = Math.pow(intersectionRatio, 2)
    const transformCurve = Math.pow(intersectionRatio - 1, 2) * 30

    // Only change opacity when scrolling back up
    if (exiting) {
      return {
        opacity: opacityCurve,
      }
    }

    return {
      opacity: opacityCurve,
      transform: ` matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${transformCurve}, 0, 1)`,
    }
  }

  render() {
    const { children } = this.props

    return (
      <Observer
        render={data => {
          return (
            <div style={isMobile ? {} : this.calculateStyleCurves(data)}>
              {children}
            </div>
          )
        }}
      />
    )
  }
}

export default AnimatorFadeUp
