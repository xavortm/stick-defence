import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import GameWrapper from '../index';

const renderer = createRenderer();

describe('<GameWrapper />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<GameWrapper />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
