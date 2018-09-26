import * as React from "react";

import { Popover } from "./popover";
import { TargetHover } from "./target.hover";
import { PopperHover } from "./popper.hover";

import {
  configure,
  mount,
  ReactWrapper,
  shallow,
  ShallowWrapper
} from "enzyme";

// Configure enzyme
import * as Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Popover", () => {
  it("Renders", () => {
    let wrapper = shallow(<Popover popperType="hover" targetType="hover" />);
    expect(wrapper.find(TargetHover)).toHaveLength(1);
    expect(wrapper.find(PopperHover)).toHaveLength(1);
  });
});
