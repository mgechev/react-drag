var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');
var Draggable = require('../lib/react-drag');

describe('react-draggable', function () {
  'use strict';
  describe('props', function () {
    it('should have default properties', function () {
      var drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      expect(drag.props.axis).toEqual('both');
      expect(drag.props.handle).toEqual(null);
      expect(drag.props.cancel).toEqual(null);
      expect(isNaN(drag.props.zIndex)).toEqual(true);
      expect(typeof drag.props.onStart).toEqual('function');
      expect(typeof drag.props.onDrag).toEqual('function');
      expect(typeof drag.props.onStop).toEqual('function');
    });

    it('should honor props', function () {
      function handleStart() {}
      function handleDrag() {}
      function handleStop() {}

      var drag = TestUtils.renderIntoDocument(
        <Draggable
          axis="y"
          handle=".handle"
          cancel=".cancel"
          grid={[10, 10]}
          zIndex={1000}
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}>
          <div>
            <div className="handle"/>
            <div className="cancel"/>
          </div>
        </Draggable>
      );

      expect(drag.props.axis).toEqual('y');
      expect(drag.props.handle).toEqual('.handle');
      expect(drag.props.cancel).toEqual('.cancel');
      expect(drag.props.grid).toEqual([10, 10]);
      expect(drag.props.zIndex).toEqual(1000);
      expect(drag.props.bound).toBeFalsy();
      expect(drag.props.onStart).toEqual(handleStart);
      expect(drag.props.onDrag).toEqual(handleDrag);
      expect(drag.props.onStop).toEqual(handleStop);
    });

    it('should call onStart when dragging begins', function () {
      var called = false;
      var drag = TestUtils.renderIntoDocument(
        <Draggable onStart={function () { called = true; }}>
          <div/>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      expect(called).toEqual(true);
    });

    it('should call onStop when dragging ends', function () {
      var called = false;
      var drag = TestUtils.renderIntoDocument(
        <Draggable onStop={function () { called = true; }}>
          <div/>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      TestUtils.Simulate.mouseUp(ReactDOM.findDOMNode(drag));
      expect(called).toEqual(true);
    });
  });

  describe('interaction', function () {
    it('should initialize dragging onmousedown', function () {
      var drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      expect(drag.state.dragging).toEqual(true);
    });

    it('should only initialize dragging onmousedown of handle', function () {
      var drag = TestUtils.renderIntoDocument(
        <Draggable handle=".handle">
          <div>
            <div className="handle">Handle</div>
            <div className="content">Lorem ipsum...</div>
          </div>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag).querySelector('.content'));
      expect(drag.state.dragging).toEqual(false);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag).querySelector('.handle'));
      expect(drag.state.dragging).toEqual(true);
    });

    it('should not initialize dragging onmousedown of cancel', function () {
      var drag = TestUtils.renderIntoDocument(
        <Draggable cancel=".cancel">
          <div>
            <div className="cancel">Cancel</div>
            <div className="content">Lorem ipsum...</div>
          </div>
        </Draggable>
      );

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag).querySelector('.cancel'));
      expect(drag.state.dragging).toEqual(false);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag).querySelector('.content'));
      expect(drag.state.dragging).toEqual(true);
    });

    it('should discontinue dragging onmouseup', function () {
      var drag = TestUtils.renderIntoDocument(<Draggable><div/></Draggable>);

      TestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(drag));
      expect(drag.state.dragging).toEqual(true);

      TestUtils.Simulate.mouseUp(ReactDOM.findDOMNode(drag));
      expect(drag.state.dragging).toEqual(false);
    });
  });

  describe('validation', function () {
    it('should result with invariant when there isn\'t any children', function () {
      expect(() => TestUtils.renderIntoDocument(<Draggable/>)).toThrow();
    });

    it('should result with invariant if there\'s more than a single child', function () {
      expect(() => TestUtils.renderIntoDocument(<Draggable><div/><div/></Draggable>)).toThrow();
    });
  });
});