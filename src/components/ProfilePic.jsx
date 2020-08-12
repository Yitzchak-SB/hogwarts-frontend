import React from "react";
import Avatar from "react-avatar";

class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    const src = this.props.url;
    this.state = {
      preview: null,
      src,
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
  }

  onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  render() {
    return (
      <div>
        <Avatar size="30" round={true} src={this.state.src} />
      </div>
    );
  }
}

export default ProfilePic;
