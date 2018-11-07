import React, { Component } from "react";
import styled from "styled-components";
import Portal from "../Utilities/Portal";
import { absolute } from "../Utilities/absolute";
// import Icon from "./Icon";
import { Card } from "./Card";
import { Transition } from "react-spring";
import { FaWindowClose } from "react-icons/fa";
import Icon from "./Icon";
/* eslint import/prefer-default-export: 0 */
// eslint-disable-next-line
import elevation from "../Utilities/elevation";
import transition from "../Utilities/transition";

export default class Modal extends Component {
  state = {
    on: true
  };
  toggle = () => {
    this.setState({
      on: false
    });
  };
  render() {
    const { children, toggle } = this.props;
    const { on } = this.state;
    return (
      <Portal>
        <Transition
          items={on}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {on =>
            on &&
            (styles => (
              <ModalWrapper style={styles}>
                <ModalCard>
                  <CloseButton onClick={this.toggle}>
                    <Icon name="close" />
                  </CloseButton>
                  <div>{children}</div>
                </ModalCard>
                <Background onClick={toggle} />
              </ModalWrapper>
            ))
          }
        </Transition>
      </Portal>
    );
  }
}

const ModalWrapper = styled.div`
  ${absolute({})};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  background: white;
  border-radius: 5px;
  padding: 15px;
  max-width: 320px;
  margin: 0 auto;
  color: #194d33;
  ${elevation[3]};
  ${transition({
    property: "box-shadow"
  })};
  &:hover {
    ${elevation[4]};
  }
  position: relative;
  min-width: 320px;
  z-index: 10;
  margin-bottom: 100px;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  padding: 10px;
  ${absolute({
    y: "top",
    x: "right"
  })};
`;

const Background = styled.div`
  ${absolute({})};
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.5;
`;
