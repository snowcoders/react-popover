import * as React from "react";

import { Popover, PopoverProps } from "./popover";

import { configure, shallow } from "enzyme";

// Configure enzyme
import Adapter = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

describe("External example", () => {
  let defaultProps: PopoverProps;
  let spy: jest.Mock<any>;

  beforeEach(() => {
    spy = jest.fn();
    defaultProps = {
      popperContent: (
        <div className="globally_unique_classname">
          <div>
            This is a more complex example to show off how to unit test the
            content that exists within the Popover component
          </div>
          <div>
            <button onClick={spy}>Hi</button>
          </div>
        </div>
      ),
      popperType: "hover",
      targetContent: (
        <span>
          <i>Icon</i>
        </span>
      ),
      targetType: "hover"
    };
  });

  it("Calls spy when button is clicked", () => {
    // Render and find the popper content
    let wrapper = shallow(<Popover {...defaultProps} />);
    let popperContent = wrapper.find(".globally_unique_classname");
    expect(popperContent).toHaveLength(1);

    // Click the button that triggers the spy
    let onClick = popperContent.find("button").props().onClick;
    if (onClick != null) {
      onClick({} as any);
    } else {
      throw new Error(
        "Button onclick should be defined in test initialization"
      );
    }

    expect(spy).toHaveBeenCalled();
  });
});
