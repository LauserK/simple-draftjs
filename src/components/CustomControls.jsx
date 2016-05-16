import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import Button from './Button';
import getButtons from '../utils/getButtons';

import DEFAULT_CONTROLS from '../constants/defaultControls';

class InlineControls extends Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
  };

  /**
   * Render separator for buttons block
   * @param  {number} index Index for key
   * @return {Component}
   */
  @autobind
  renderSeparator(index) {
    return (
      <div
        key={index}
        className="RichEditor-separator"
      ></div>
    );
  }


  /**
   * render button with action
   * @param  {Function}  action    Action for button
   * @param  {Object}  control
   * @param  {Boolean} receiveStyle
   * @return {Component}
   */
  @autobind
  renderButton(action, control, receiveStyle = false) {
    const { editorState } = this.props;
    const currentStyle = editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const block = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey());
    return (
      <Button
        key={control.label}
        active={currentStyle.has(control.style) || block.getType() === control.style}
        label={control.label}
        icon={control.icon}
        classname={control.classname}
        action={action}
        style={control.style}
        receiveStyle={receiveStyle}
      />
    );
  }

  /**
   * Inline Controls for editor
   * @param  {Object} options.editorState
   * @param  {Function} options.onToggle
   * @return {Component}
   */
  render() {
    const controlList = getButtons(this.props.controls);
    const controls = controlList.lenght === 0 ? controlList || DEFAULT_CONTROLS;
    return (
      <div className="RichEditor-controls">
        {controls.map((control, index) => this.selectType(control, index))}
      </div>
    );
  }

  /**
   * Define buttons settings
   * @param  {Object} control
   * @param  {Number} index   Used for key
   * @return {Component}      render Button
   */
  @autobind
  selectType(control, index) {
    const {
      onAddMedia,
      onAddLink,
      onRemoveLink,
      onToggleBlock,
      onToggleInline,
    } = this.props;
    const { type } = control;
    switch (type) {
    case 'separator':
      return this.renderSeparator(index);
    case 'block':
      return this.renderButton(onToggleBlock, control, true);
    case 'inline':
      return this.renderButton(onToggleInline, control, true);
    case 'image':
      return this.renderButton(onAddMedia, control);
    case 'link':
      return this.renderButton(onAddLink, control);
    case 'unlink':
      return this.renderButton(onRemoveLink, control);
    default:
      return this.renderSeparator();
    }
  }
}

export default InlineControls;
