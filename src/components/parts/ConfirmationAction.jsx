import React, { Component } from 'react';
import { Popup, Button } from 'semantic-ui-react';

class ConfirmationAction extends Component {
  state = {
    toConfirm: false,
  };

  confirmAction = () => {
    const { toConfirm } = this.state;
    if (toConfirm) {
      this.setState({ toConfirm: false });
    } else {
      this.setState({ toConfirm: true });
    }
  }

  render() {
    const { toConfirm } = this.state;
    const { passAction } = this.props;

    return (
      <div className="confirm-wrapper">
        <Popup
        trigger={<Button type="button" icon>{this.props.children}</Button>}
        on='click'
        open={toConfirm}
        onClose={this.confirmAction}
        onOpen={this.confirmAction}
        position='top center'
        inverted>
          Are you sure? <br/>
          <a onClick={passAction} className="link text-uppercase">Yes</a>
          <a onClick={this.confirmAction} className="btn-cancel link text-uppercase">No</a>
        </Popup>
      </div>
    );
  }
}

export default ConfirmationAction;

