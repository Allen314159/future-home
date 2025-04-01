import React from 'react';
import styled from 'styled-components';

const Radio = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="de">
          <div className="den">
            <hr className="line" />
            <hr className="line" />
            <hr className="line" />
            <div className="switch">
              <label htmlFor="switch_off"><span>OFF</span></label>
              <label htmlFor="switch_1"><span>1</span></label>
              <label htmlFor="switch_2"><span>2</span></label>
              <label htmlFor="switch_3"><span>3</span></label>
              <label htmlFor="switch_4"><span>4</span></label>
              <label htmlFor="switch_5"><span>5</span></label>
              <input type="radio" defaultChecked name="switch" id="switch_off" />
              <input type="radio" name="switch" id="switch_1" />
              <input type="radio" name="switch" id="switch_2" />
              <input type="radio" name="switch" id="switch_3" />
              <input type="radio" name="switch" id="switch_4" />
              <input type="radio" name="switch" id="switch_5" />
              <div className="light"><span /></div>
              <div className="dot"><span /></div>
              <div className="dene">
                <div className="denem">
                  <div className="deneme">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* SWITCH
  --------------------------------------------- */

  .container .origin {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 111;
    width: 2px;
    height: 2px;
    margin: -1px 0 0 -1px;
    background-color: #f50;
  }

  .de {
    user-select: none;
    position: relative;
    width: 230px;
    height: 230px;
    border-radius: 100%;
    box-shadow: 0 0 25px rgba(0, 0, 0, .1);
    background-color: transparent;
  }

  .de .den, .de .dene, .de .denem, .de .deneme, .de .light, .de .dot {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .den {
    position: relative;
    width: 220px;
    height: 220px;
    margin: -110px 0 0 -110px;
    border-radius: 100%;
    box-shadow: inset 0 3px 10px rgba(0, 0, 0, .6), 0 2px 20px rgba(255, 255, 255, 1);
    background: #888888;
    background: -moz-radial-gradient(center, ellipse cover, #888888 0%, #333333 100%);
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, #888888), color-stop(100%, #333333));
    background: -webkit-radial-gradient(center, ellipse cover, #888888 0%, #333333 100%);
    background: -o-radial-gradient(center, ellipse cover, #888888 0%, #333333 100%);
  }

  .dene {
    z-index: 4;
    width: 140px;
    height: 140px;
    margin: -70px 0 0 -70px;
    border-radius: 100%;
    box-shadow: inset 0 2px 2px rgba(255, 255, 255, .4), 0 3px 13px rgba(0, 0, 0, .85);
    background: #f2f6f5;
    background: -moz-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f2f6f5), color-stop(100%, #cbd5d6));
    background: -webkit-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%);
    background: -o-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%);
  }

  .denem {
    width: 120px;
    height: 120px;
    margin: -60px 0 0 -60px;
    border-radius: 100%;
    background: #cbd5d6;
    background: -moz-linear-gradient(top, #cbd5d6 0%, #f2f6f5 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cbd5d6), color-stop(100%, #f2f6f5));
    background: -webkit-linear-gradient(top, #cbd5d6 0%, #f2f6f5 100%);
    background: -o-linear-gradient(top, #cbd5d6 0%, #f2f6f5 100%);
  }

  .deneme {
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
    border-radius: 100%;
    box-shadow: inset 0 2px 3px rgba(255, 255, 255, .6), 0 8px 20px rgba(0, 0, 0, .9);
    background: #eef7f6;
    background: -moz-linear-gradient(top, #eef7f6 0%, #8d989a 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #eef7f6), color-stop(100%, #8d989a));
    background: -webkit-linear-gradient(top, #eef7f6 0%, #8d989a 100%);
    background: -o-linear-gradient(top, #eef7f6 0%, #8d989a 100%);
  }

  .den .switch {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .den .switch label {
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 70px;
    margin-top: -35px;
    transform-origin: 0% 50%;
    -webkit-transform-origin: 0% 50%;
    -o-transform-origin: 0% 50%;
  }

  .den .switch label:after {
    content: "";
    position: absolute;
    top: 6px;
    left: 1px;
    width: 100%;
    height: 30px;
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den .switch label:before {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 1px;
    width: 100%;
    height: 30px;
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den .switch label span {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    font-weight: bold;
    font-size: 15px;
    line-height: 70px;
    text-align: center;
    color: #eee;
    text-shadow: 0 1px 0 #444;
  }

  .den .switch label:nth-child(1) {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den .switch label:nth-child(1) span {
    right: 2px;
    font-size: 13px;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den .switch label:nth-child(2) {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den .switch label:nth-child(2) span {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den .switch label:nth-child(3) {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den .switch label:nth-child(3) span {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den .switch label:nth-child(4) {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den .switch label:nth-child(4) span {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den .switch label:nth-child(5) {
    transform: rotate(150deg);
    -webkit-transform: rotate(150deg);
    -o-transform: rotate(150deg);
  }

  .den .switch label:nth-child(5) span {
    transform: rotate(-150deg);
    -webkit-transform: rotate(-150deg);
    -o-transform: rotate(-150deg);
  }

  .den .switch label:nth-child(6) {
    transform: rotate(210deg);
    -webkit-transform: rotate(210deg);
    -o-transform: rotate(210deg);
  }

  .den .switch label:nth-child(6) span {
    transform: rotate(-210deg);
    -webkit-transform: rotate(-210deg);
    -o-transform: rotate(-210deg);
  }

  .den .switch input {
    position: absolute;
    opacity: 0;
    visibility: hidden;
  }

  /* SWITCH LIGHT */

  .den .light {
    z-index: 1;
    width: 50%;
    height: 100px;
    margin-top: -50px;
    transform-origin: 0% 50%;
    -webkit-transform-origin: 0% 50%;
    -o-transform-origin: 0% 50%;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -webkit-transition: all .5s;
    transition: all .5s;
    -o-transition: all .5s;
  }

  .den .light span {
    opacity: .4;
    position: absolute;
    top: 0;
    left: 15px;
    width: 100px;
    height: 100px;
    background: -moz-radial-gradient(center, ellipse cover, rgba(184, 163, 204, 1) 0%, rgba(159, 197, 224, 0.42) 42%, rgba(111, 113, 179, 0) 72%, rgba(67, 34, 137, 0) 100%);
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(184, 163, 204, 1)), color-stop(42%, rgba(159, 197, 224, 0.42)), color-stop(72%, rgba(111, 113, 179, 0)), color-stop(100%, rgba(67, 34, 137, 0)));
    background: -webkit-radial-gradient(center, ellipse cover, rgba(184, 163, 204, 1) 0%, rgba(159, 197, 224, 0.42) 42%, rgba(111, 113, 179, 0) 72%, rgba(67, 34, 137, 0) 100%);
    background: -o-radial-gradient(center, ellipse cover, rgba(184, 163, 204, 1) 0%, rgba(159, 197, 224, 0.42) 42%, rgba(111, 113, 179, 0) 72%, rgba(67, 34, 137, 0) 100%);
  }

  /* SWITCH LIGHT POSITION */

  .den #switch_off:checked ~ .light {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den #switch_1:checked ~ .light {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den #switch_2:checked ~ .light {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den #switch_3:checked ~ .light {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den #switch_4:checked ~ .light {
    transform: rotate(150deg);
    -webkit-transform: rotate(150deg);
    -o-transform: rotate(150deg);
  }

  .den #switch_5:checked ~ .light {
    transform: rotate(210deg);
    -webkit-transform: rotate(210deg);
    -o-transform: rotate(210deg);
  }

  /* SWITCH LIGHT */

  .den .dot {
    z-index: 6;
    width: 50%;
    height: 12px;
    margin-top: -6px;
    transform-origin: 0% 50%;
    -webkit-transform-origin: 0% 50%;
    -o-transform-origin: 0% 50%;
    transition: all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
  }

  .den .dot span {
    position: absolute;
    top: 0;
    left: 30px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background: #dae2e4;
    background: -moz-linear-gradient(top, #dae2e4 0%, #ecf5f4 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #dae2e4), color-stop(100%, #ecf5f4));
    background: -webkit-linear-gradient(top, #dae2e4 0%, #ecf5f4 100%);
    background: -o-linear-gradient(top, #dae2e4 0%, #ecf5f4 100%);
  }

  /* SWITCH LIGHT POSITION */

  .den #switch_off:checked ~ .dot {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den #switch_off:checked ~ .dot span {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den #switch_1:checked ~ .dot {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den #switch_1:checked ~ .dot span {
    opacity: .9;
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den #switch_2:checked ~ .dot {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den #switch_2:checked ~ .dot span {
    opacity: .5;
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den #switch_3:checked ~ .dot {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den #switch_3:checked ~ .dot span {
    opacity: .4;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den #switch_4:checked ~ .dot {
    transform: rotate(150deg);
    -webkit-transform: rotate(150deg);
    -o-transform: rotate(150deg);
  }

  .den #switch_4:checked ~ .dot span {
    opacity: .5;
    transform: rotate(-150deg);
    -webkit-transform: rotate(-150deg);
    -o-transform: rotate(-150deg);
  }

  .den #switch_5:checked ~ .dot {
    transform: rotate(210deg);
    -webkit-transform: rotate(210deg);
    -o-transform: rotate(210deg);
  }

  .den #switch_5:checked ~ .dot span {
    opacity: .9;
    transform: rotate(-210deg);
    -webkit-transform: rotate(-210deg);
    -o-transform: rotate(-210deg);
  }

  /* LINE */

  .den hr.line {
    z-index: 1;
    position: absolute;
    top: 50%;
    width: 100%;
    height: 0;
    margin-top: -1px;
    border-width: 1px 0;
    border-style: solid;
    border-top-color: #3c3d3f;
    border-bottom-color: #666769;
  }

  .den hr.line:nth-child(1) {
    transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
  }

  .den hr.line:nth-child(2) {
    transform: rotate(60deg);
    -webkit-transform: rotate(60deg);
    -o-transform: rotate(60deg);
  }`;

export default Radio;
