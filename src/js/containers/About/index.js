import React from "react";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { RatingAttrCard } from "./RatingAttrCard";
import pathActions from "../../redux/path/actions";
import { Icon1, Icon2, Icon3, Icon4 } from "../../components/Icons";
import "./style.css";

function About({ setPath }) {
  return (
    <div className="about-container">
      <div className="content-header">
        <div className="about-header-wrapper">
          <div className="about-header">
            <h2>About the SUPR-Q</h2>
            <button className="btn-primary" onClick={() => setPath('manage-supr')}>Manage SUPR-Q</button>
          </div>
          <p>
            The SUPR-Q (Standardized User Experience Percentile Rank Questionnaire) is a psychometrically valid and reliable 8-item questionnaire that measures the critical aspects of the website user-experience: usability, credibility, loyalty and appearance.<br/>
            <br/>
            The SUPR-Q provides relative rankings expressed as percentages, comparing the UX score to over 200 websites.
          </p>
        </div>
      </div>
      <div className="content-body">
        <h3 className="rating-card-heading">RATING ATTRIBUTES</h3>
        <div className="rating-card-container">
          <RatingAttrCard
            icon={<Icon1/>}
            heading="USABILITY"
            options={[
              'This website is easy to use',
              'It is easy to navigate with this website'
            ]}
          />
          <RatingAttrCard
            icon={<Icon2/>}
            heading="CREDIBILITY (TRUST)"
            options={[
              'The information on this website is credible',
              'The information on this website is trustworthy'
            ]}
          />
          <RatingAttrCard
            icon={<Icon3/>}
            heading="LOYALTY"
            options={[
              'How likely are you to recommend this website to a friend or colleague? [Net Promotor Score (NPS)]',
              'I will likely visit the website in the future'
            ]}
          />
          <RatingAttrCard
            icon={<Icon4/>}
            heading="APPEARANCE"
            options={[
              'I found the website to be attractive',
              'The website has a clean and simple presentation'
            ]}
          />
        </div>
        <div className="rating-bottom-container">
          <div>
            <p>Rating Scale: 1 – 5, Strongly Disagree – Strongly Agree [Higher is better]</p>
            <p>For NPS: 0 – 10, Not at All Likely – Extremely Likely</p>
          </div>
          {/*<button className="btn-primary">Export Boilerplate Slide</button>*/}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPath: (data) => pathActions.setPath(data),
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(About);
