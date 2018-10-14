import * as React from "react";

import { PopperBlur } from "./popper.blur";
import { PopperClick } from "./popper.click";
import { PopperHover } from "./popper.hover";

import { configure, shallow } from "enzyme";

// Configure enzyme
import Adapter = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

function shallowPopperBlur() {
  return shallow(<PopperBlur onDismiss={() => {}} />);
}

function shallowPopperClick() {
  return shallow(<PopperClick onDismiss={() => {}} />);
}

function shallowPopperHover() {
  return shallow(<PopperHover onHoverChange={() => {}} />);
}

// These are tests that all poppers should have in common
describe("Popper", () => {
  for (let shallowFactory of [
    {
      name: "Blur",
      factory: shallowPopperBlur
    },
    {
      name: "Click",
      factory: shallowPopperClick
    },
    {
      name: "Hover",
      factory: shallowPopperHover
    }
  ]) {
    describe(shallowFactory.name, () => {
      it("Has `sci-react-popover--popper` class", () => {
        let wrapper = shallowFactory.factory();
        expect(wrapper.find(".sci-react-popover--popper")).toHaveLength(1);
      });
    });
  }
});
