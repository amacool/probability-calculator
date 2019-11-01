import React from "react";
import { RatingAttrCard } from "./RatingAttrCard";
import "./style.css";

export default function About() {
  return (
    <div>
      <div className="content-header">
        <div>
          <h2>About the SUPR-Q</h2>
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
            icon={<p>hello</p>}
            heading="usability"
            options={[
              'This website is easy to use',
              'it is easy to navigate with this website'
            ]}
          />
          <RatingAttrCard
            icon={<p>hello</p>}
            heading="usability"
            options={[
              'This website is easy to use',
              'it is easy to navigate with this website'
            ]}
          />
          <RatingAttrCard
            icon={<p>hello</p>}
            heading="usability"
            options={[
              'This website is easy to use',
              'it is easy to navigate with this website'
            ]}
          />
          <RatingAttrCard
            icon={<p>hello</p>}
            heading="usability"
            options={[
              'This website is easy to use',
              'it is easy to navigate with this website'
            ]}
          />
        </div>
        <div className="rating-bottom-container">
          <div>
            <p>Rating Scale: 1 - 5, Strongly Disagree - Strongly Agree [Higher is better]</p>
            <p>For NPS: 0 - 10, Not at All Likely - Extremely Likely</p>
          </div>
          <button className="btn-primary">Export Boilerplate Slide</button>
        </div>
      </div>
    </div>
  );
}
