import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import ComposeHeader from "./header";
import ComposeMain from "./main";
import ComposeDataPanel from "./datapanel";
import ComposeFooter from "./footer";
import LoadingOverlay from "./loading_overlay";

export default React.createClass({
  getInitialState: function() {
    return {
      mail_merge_mode: true,
      is_sending: false,
      active_index: 0,
      in_use_columns: [],
      merge_data: [
        //["email"],
        //[""]
        ["First name", "Last name", "Email"],
        ["Peter","Mccoy","pmccoy0@blogspot.com"  ],
        ["Lawrence","Hughes","lhughes1@gravatar.com"  ],
        ["Barbara","Washington","bwashington2@jalbum.net"  ],
        ["Jacqueline","Clark","jclark3@princeton.edu"  ],
        ["Kevin","Walker","kwalker4@acquirethisname.com"  ],
        ["Mildred","Morgan","mmorgan5@nytimes.com"  ],
        ["Philip","Murphy","pmurphy6@wiley.com"  ],
        ["Maria","Daniels","mdaniels7@toplist.cz"  ],
        ["Mary","Lawrence","mlawrence8@yandex.ru"  ],
        ["Walter","Williams","wwilliams9@friendfeed.com"  ],
        ["Teresa","Cox","tcoxa@bbb.org"  ],
        ["Aaron","Lynch","alynchb@cdc.gov"  ],
        ["Kevin","Alvarez","kalvarezc@stanford.edu"  ],
        ["Randy","Washington","rwashingtond@nih.gov"  ],
        ["Elizabeth","Carr","ecarre@weather.com"  ],
        ["Laura","Henderson","lhendersonf@japanpost.jp"  ],
        //["Kathleen","Arnold","karnoldg@hud.gov"  ],
        //["Lois","Webb","lwebbh@wsj.com"  ],
        //["Aaron","Morales","amoralesi@google.cn"  ],
        //["Mary","Castillo","mcastilloj@typepad.com"  ],
        //["Linda","Long","llongk@amazon.co.uk"  ],
        //["Diana","Diaz","ddiazl@ucla.edu"  ],
        //["Phyllis","Nichols","pnicholsm@chron.com"  ],
        //["Brian","Hawkins","bhawkinsn@bloglines.com"  ],
        //["Randy","Grant","rgranto@tumblr.com"  ],
        //["Juan","Peters","jpetersp@delicious.com"  ],
        //["Norma","Mendoza","nmendozaq@scientificamerican.com"  ],
        //["Donna","Lee","dleer@clickbank.net"  ],
        //["Karen","Jenkins","kjenkinss@bbc.co.uk"  ],
        //["Christopher","Snyder","csnydert@weibo.com"  ],
        //["Ryan","Owens","rowensu@google.cn"  ],
        //["Angela","Lynch","alynchv@rambler.ru"  ]
      ]
    };
  },
  toggle_mail_merge_mode: function(index) {
    this.setState({mail_merge_mode: !this.state.mail_merge_mode});
  },
  update_merge_data: function(data) {
      /* filter for uneven rows */
      data = data.filter(function(l) { return l.length == data[0].length; });
    this.setState({merge_data: data, active_index: 0});
  },
  update_active_index: function(index) {
    if (index >= 0 && index < this.state.merge_data.length - 1) {
      this.setState({active_index: index});
    }
  },
  add_row: function() {
    var row = new Array(this.state.merge_data[0].length).fill("");
    this.setState({merge_data: this.state.merge_data.concat([row])});
  },
  add_column: function() {
    this.setState({merge_data: this.state.merge_data.map(function(d) {
        return d.concat([""]);
      })
    });
  },
  render: function() {
    var active_data = this.state.merge_data == null ? null : this.state.merge_data[this.state.active_index + 1];

    var email_class = "email";
    email_class += " mailmerge-" + (this.state.mail_merge_mode ? "enabled" : "disabled");
    if (this.state.is_sending) {
      email_class += " email-sending";
    }

    return <div className={email_class}>
      <ComposeHeader />

      <div className="email-container">
        <ComposeMain compose={this} active_data={active_data} />

        <ComposeDataPanel compose={this} merge_data={this.state.merge_data} active_index={this.state.active_index} />
      </div>

      <ComposeFooter compose={this} />

      <LoadingOverlay />
    </div>;
  }
});
