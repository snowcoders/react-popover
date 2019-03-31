import * as React from "react";

import { PopperBlur, PopperBlurProps } from "./popper.blur";

// Configure enzyme
import { configure, shallow } from "enzyme";
import Adapter = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

describe("Popper.Blur", () => {
  let defaultProps: PopperBlurProps;
  let spy: jest.Mock<any>;

  beforeEach(() => {
    spy = jest.fn();
    defaultProps = {
      onDismiss: () => {}
    };
  });

  it("Renders", () => {
    // Render and find the popper content
    let wrapper = shallow(<PopperBlur {...defaultProps} />);
  });
});
