import * as React from "react";

import { Popover, PopoverProps, PopperType, TargetType } from "./popover";
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

  describe("Open/Close scenarios", () => {
    let targetHoverState: boolean = false;
    let targetInfos: Array<{
      type: TargetType;
      component: any;
      activate: (component: any) => void;
    }> = [
      {
        component: TargetClick,
        type: "click",
        activate: target => {
          target.props().onClick({} as any);
        }
      },
      {
        component: TargetHover,
        type: "hover",
        activate: target => {
          targetHoverState = !targetHoverState;
          target.props().onHoverChange(targetHoverState);
        }
      }
    ];
    let popperInfos: Array<{
      type: PopperType;
      component: any;
      activate: (component: any) => void;
    }> = [
      {
        component: PopperHover,
        type: "hover",
        activate: target => {
          target.props().onHoverChange(false);
        }
      },
      {
        component: PopperHover,
        type: "none",
        activate: target => {
          target.props().onHoverChange(false);
        }
      },
      {
        component: PopperClick,
        type: "click",
        activate: target => {
          target.props().onDismiss();
        }
      },
      {
        component: PopperBlur,
        type: "blur",
        activate: target => {
          target.props().onDismiss({} as any);
        }
      }
    ];

    describe("Target events", () => {
      for (let targetType of targetInfos) {
        for (let popperType of popperInfos) {
          describe(`TargetType: ${targetType.type}, PopperType: ${
            popperType.type
          }`, () => {
            beforeEach(() => {
              targetHoverState = false;
              defaultProps = {
                ...defaultProps,
                popperType: popperType.type,
                targetType: targetType.type
              };
            });

            it("Renders closed by default", () => {
              let wrapper = shallow(<Popover {...defaultProps} />);

              let popper = wrapper.find(popperType.component);
              expect(popper).toHaveLength(1);
              expect(popper.hasClass("visible")).toBe(false);
            });

            it("Renders open/closed when clicked", () => {
              let wrapper = shallow(<Popover {...defaultProps} />);

              // Activate the target and open it
              let target = wrapper.find(targetType.component);
              targetType.activate(target);

              // Verify the popper is open
              let popper = wrapper.find(popperType.component);
              expect(popper).toHaveLength(1);
              expect(popper.hasClass("visible")).toBe(true);

              // Now activate the target again to close it
              target = wrapper.find(targetType.component);
              targetType.activate(target);

              // Verify the popper is in expected state
              popper = wrapper.find(popperType.component);
              expect(popper).toHaveLength(1);
              if (
                targetType.type === "hover" &&
                (popperType.type === "click" || popperType.type === "blur")
              ) {
                // For these types, the popper should open by the target but only the popper can close it, not the target
                expect(popper.hasClass("visible")).toBe(true);
              } else {
                // For these two types the popper should disappear when no longer focused on the target
                expect(popper.hasClass("visible")).toBe(false);
              }
            });
          });
        }
      }
    });

    describe("Popper events", () => {
      for (let targetType of targetInfos) {
        for (let popperType of popperInfos) {
          describe(`TargetType: ${targetType.type}, PopperType: ${
            popperType.type
          }`, () => {
            beforeEach(() => {
              targetHoverState = false;
              defaultProps = {
                ...defaultProps,
                popperType: popperType.type,
                targetType: targetType.type
              };
            });

            it("Renders closed by default", () => {
              let wrapper = shallow(<Popover {...defaultProps} />);

              let popper = wrapper.find(popperType.component);
              expect(popper).toHaveLength(1);
              expect(popper.hasClass("visible")).toBe(false);
            });

            it("Closes when requested", () => {
              let wrapper = shallow(<Popover {...defaultProps} />);

              // Actiate the target and open it
              let target = wrapper.find(targetType.component);
              targetType.activate(target);

              // Verify the popper is open
              let popper = wrapper.find(popperType.component);
              expect(popper).toHaveLength(1);
              expect(popper.hasClass("visible")).toBe(true);

              // Now activate the popper to close it
              popper = wrapper.find(popperType.component);
              popperType.activate(popper);

              // Verify the popper is in expected state
              popper = wrapper.find(popperType.component);
              expect(popper).toHaveLength(1);
              if (popperType.type === "none") {
                // In the none case, the popper's callback should have no affect
                expect(popper.hasClass("visible")).toBe(true);
              } else {
                expect(popper.hasClass("visible")).toBe(false);
              }
            });
          });
        }
      }
    });
  });

  describe("Uncontrolled component methods", () => {
    let spy: jest.SpyInstance<void, [boolean]>;
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        isOpen: undefined,
        onOpenChange: () => {}
      };
      spy = jest.spyOn(defaultProps, "onOpenChange");
    });

    it("Opens by method", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);
      expect(spy).not.toHaveBeenCalled();

      (wrapper.instance() as Popover).open();

      popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(true);
    });

    it("Opens by hover, closes on request", () => {
      let wrapper = shallow(<Popover {...defaultProps} />);

      let popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);

      popper.props().onHoverChange(true);

      popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(true);

      spy.mockReset();
      (wrapper.instance() as Popover).close();

      popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenLastCalledWith(false);
    });
  });

  describe("Controlled component methods", () => {
    let spy: jest.SpyInstance<void, [boolean]>;
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        isOpen: false,
        onOpenChange: () => {}
      };
      spy = jest.spyOn(defaultProps, "onOpenChange");
    });

    it("Opens by prop", () => {
      let wrapper = shallow(<Popover {...defaultProps} isOpen={false} />, {
        lifecycleExperimental: true
      });

      let popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);
      expect(spy).not.toHaveBeenCalled();

      wrapper.setProps({
        isOpen: true
      });

      popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(true);
      expect(spy).not.toHaveBeenCalled();
    });

    it("Closes by prop", () => {
      let wrapper = shallow(<Popover {...defaultProps} isOpen={true} />);

      let popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(true);
      expect(spy).not.toHaveBeenCalled();

      wrapper.setProps({
        isOpen: false
      });
      wrapper.update();

      popper = wrapper.find(PopperHover);
      expect(popper).toHaveLength(1);
      expect(popper.hasClass("visible")).toBe(false);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
