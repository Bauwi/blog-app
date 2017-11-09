import React, { Component } from 'react';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

export default class ReadPostSummaryToolbar extends Component {
  render() {
    const {
      FacebookShareButton,
      GooglePlusShareButton,
      LinkedinShareButton,
      TwitterShareButton,
      TelegramShareButton,
      WhatsappShareButton,
      PinterestShareButton,
      VKShareButton,
      OKShareButton,
      RedditShareButton,
      EmailShareButton
    } = ShareButtons;
    return (
      <div>
        <p>toolbar</p>
        <TwitterShareButton url="http://localhost:8080/5dxtZH5kpEZwR90vmDmZykIRekE2/read/iHASCMysN2ToVZEqB0xR">
          FacebookShareButton
        </TwitterShareButton>
      </div>
    );
  }
}
