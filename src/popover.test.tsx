import * as React from "react";

import { Popover, PopoverProps } from "./popover";
import { PopperHover } from "./popper.hover";
import { TargetHover } from "./target.hover";

import { configure, shallow } from "enzyme";

// Configure enzyme
import Adapter = require("enzyme-adapter-react-16");
import { PopperBlur } from "./popper.blur";
import { PopperClick } from "./popper.click";
import { TargetClick } from "./target.click";
configure({ adapter: new Adapter() });

describe("Popover", () => {
  let defaultProps: PopoverProps;

  beforeEach(() => {
    defaultProps = {
      popperContent: "Popper content",
      popperType: "hover",
      targetContent: "Target content",
      targetType: "hover"
    };
  });

  it("Renders", () => {
    let wrapper = shallow(<Popover {...defaultProps} />);
    let targetHover = wrapper.find(TargetHover);
    let popperHover = wrapper.find(PopperHover);

    expect(targetHover).toEqual(wrapper.childAt(0));
    expect(popperHover).toEqual(wrapper.childAt(1));
  });

  it("Renders with wrapper", () => {
    defaultProps = {
      ...defaultProps,
      wrapperElementProps: {
        className: "wrapper"
      },
      wrapperElementType: "div"
    };
    let wrapper = shallow(<Popover {...defaultProps} />);
    let targetHover = wrapper.find(TargetHover);
    let popperHover = wrapper.find(PopperHover);

    let wrapperElement = wrapper.childAt(0);
    expect(wrapperElement.name()).toBe("div");
    expect(wrapperElement.hasClass("wrapper")).toBe(true);

    expect(targetHover).toEqual(wrapperElement.childAt(0));
    expect(popperHover).toEqual(wrapperElement.childAt(1));
  });

  describe("Popper hover type", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        popperType: "hover"
      };
    });

    it("Renders closed by default", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popperHover = wrapper.find(PopperHover);
      expect(popperHover).toHaveLength(1);
      expect(popperHover.hasClass("visible")).toBe(false);
    });

    it("Renders open when being hovered", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popperHover = wrapper.find(PopperHover);
      popperHover.props().onHoverChange(true);

      popperHover = wrapper.find(PopperHover);
      expect(popperHover).toHaveLength(1);
      expect(popperHover.hasClass("visible")).toBe(true);
    });
  });

  describe("Popper none type", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        popperType: "none"
      };
    });

    it("Renders closed by default", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popperHover = wrapper.find(PopperHover);
      expect(popperHover).toHaveLength(1);
      expect(popperHover.hasClass("visible")).toBe(false);
    });

    it("Renders closed even if hovered on", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popperHover = wrapper.find(PopperHover);
      popperHover.props().onHoverChange(true);

      popperHover = wrapper.find(PopperHover);
      expect(popperHover).toHaveLength(1);
      expect(popperHover.hasClass("visible")).toBe(false);
    });
  });

  describe("Popper click type", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        popperType: "click"
      };
    });

    it("Renders closed by default", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popperClick = wrapper.find(PopperClick);
      expect(popperClick).toHaveLength(1);
      expect(popperClick.hasClass("visible")).toBe(false);
    });

    it("Renders closed when dismissed", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      // Hover on the target to open the popper
      let targetHover = wrapper.find(TargetHover);
      targetHover.props().onHoverChange(true);

      // Verify the popper is open
      let popperClick = wrapper.find(PopperClick);
      expect(popperClick).toHaveLength(1);
      expect(popperClick.hasClass("visible")).toBe(true);

      // Now close and verify the popper
      popperClick.props().onDismiss({} as any);
      popperClick = wrapper.find(PopperClick);
      expect(popperClick).toHaveLength(1);
      expect(popperClick.hasClass("visible")).toBe(false);
    });
  });

  describe("Popper blur type", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        popperType: "blur"
      };
    });

    it("Renders closed by default", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popper = wrapper.find(PopperBlur);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);
    });

    it("Renders closed when dismissed", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      // Hover on the target to open the popper
      let targetHover = wrapper.find(TargetHover);
      targetHover.props().onHoverChange(true);

      // Verify the popper is open
      let popper = wrapper.find(PopperBlur);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(true);

      // Now close and verify the popper
      popper.props().onDismiss({} as any);
      popper = wrapper.find(PopperBlur);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);
    });
  });

  describe("Target hover type", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        popperType: "hover",
        targetType: "hover"
      };
    });

    it("Renders closed by default", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);
    });

    it("Renders open/closed when clicked", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      // Click the target and open it
      let targetHover = wrapper.find(TargetHover);
      targetHover.props().onHoverChange(true);

      // Verify the popper is open
      let popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(true);

      // Now click the target again to close it
      targetHover = wrapper.find(TargetHover);
      targetHover.props().onHoverChange(false);
      popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);
    });
  });

  describe("Target click type", () => {
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        popperType: "hover",
        targetType: "click"
      };
    });

    it("Renders closed by default", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);
    });

    it("Renders open/closed when clicked", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      // Click the target and open it
      let targetClick = wrapper.find(TargetClick);
      targetClick.props().onClick({} as any);

      // Verify the popper is open
      let popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(true);

      // Now click the target again to close it
      targetClick = wrapper.find(TargetClick);
      targetClick.props().onClick({} as any);
      popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);
    });
  });

  describe("Uncontrolled component methods", () => {
    it("Opens on request", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popperHover = wrapper.find(PopperHover);
      expect(popperHover).toHaveLength(1);
      expect(popperHover.hasClass("visible")).toBe(false);

      (wrapper.instance() as Popover).open();

      popperHover = wrapper.find(PopperHover);
      expect(popperHover).toHaveLength(1);
      expect(popperHover.hasClass("visible")).toBe(true);
    });

    it("Closes on request", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popperHover = wrapper.find(PopperHover);
      expect(popperHover).toHaveLength(1);
      expect(popperHover.hasClass("visible")).toBe(false);

      popperHover.props().onHoverChange(true);

      popperHover = wrapper.find(PopperHover);
      expect(popperHover).toHaveLength(1);
      expect(popperHover.hasClass("visible")).toBe(true);

      (wrapper.instance() as Popover).close();

      popperHover = wrapper.find(PopperHover);
      expect(popperHover).toHaveLength(1);
      expect(popperHover.hasClass("visible")).toBe(false);
    });
  });
});
