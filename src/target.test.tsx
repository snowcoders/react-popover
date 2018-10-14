import * as React from "react";
import { Reference } from "react-popper";

import { TargetClick } from "./target.click";
import { TargetHover } from "./target.hover";

import { configure, shallow } from "enzyme";

// Configure enzyme
import Adapter = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

function shallowTargetClick() {
  return shallow(<TargetClick onClick={() => {}} />);
}

function shallowTargetHover() {
  return shallow(<TargetHover onHoverChange={() => {}} />);
}

// These are tests that all targets should have in common
describe("Target", () => {
  for (let shallowFactory of [
    {
      name: "Click",
      factory: shallowTargetClick
    },
    {
      name: "Hover",
      factory: shallowTargetHover
    }
  ]) {
    describe(shallowFactory.name, () => {
      it("Has `sci-react-popover--target` class", () => {
        let wrapper = shallowFactory.factory();
        let reference = wrapper.find(Reference);
        let referenceContent: any = reference.props().children({
          ref: () => {}
        });
        let target = shallow(referenceContent);
        expect(target.find(".sci-react-popover--target")).toHaveLength(1);
      });
    });
  }
});
