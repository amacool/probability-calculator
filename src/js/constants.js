import React from "react";
const THead = ({ title, description }) => (
  <div style={{ minHeight: '180px' }}>
    <h3>{title}</h3>
    <span><i>{description}</i></span>
  </div>
);

export const rawDataColumns = [
  {
    field: 'q1',
    title: <THead
      title='Q1: EasyUse'
      description='It is easy to navigate within the website.'
    />,
    heading: 'Q1: EasyUse',
  },
  {
    field: 'q2',
    title: <THead
      title='Q2: EasyNavigate'
      description='It is easy to navigate within the website.'
    />,
    heading: 'Q2: EasyNavigate',
  },
  {
    field: 'q3',
    title: <THead
      title='Q3: InfoTrustworthy'
      description='The information on this website is trustworthy.'
    />,
    heading: 'Q3: InfoTrustworthy'
  },
  {
    field: 'q4',
    title: <THead
      title='Q4: InfoCredible'
      description='The information on this website is credible.'
    />,
    heading: 'Q4: InfoCredible'
  },
  {
    field: 'q5',
    title: <THead
      title='Q5: NPS'
      description='How likely are you to recommend this website to a friend or colleauge?'
    />,
    heading: 'Q5: NPS'
  },
  {
    field: 'q6',
    title: <THead
      title='Q6: VisitFuture'
      description='I will likely visit this website in the future.'
    />,
    heading: 'Q6: VisitFuture'
  },
  {
    field: 'q7',
    title: <THead
      title='Q7: FindAttractive'
      description='I find the website to be attractive.'
    />,
    heading: 'Q7: FindAttractive'
  },
  {
    field: 'q8',
    title: <THead
      title='Q8: CleanSimple'
      description='The website has a clean and simple presentation.'
    />,
    heading: 'Q8: CleanSimple'
  },
];
export const rawDataColumnNames = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];

export const summaryDataColumns = [
  {
    field: 's0',
    title: '',
    editable: 'never',
    cellStyle: {
      backgroundColor: '#d4d4d4',
      color: '#323232',
      fontWeight: 'bold'
    },
    headerStyle: {
      backgroundColor: '#d4d4d4',
    }
  },
  {
    field: 's1',
    title: 'SUPR-Q (Overall)',
  },
  {
    field: 's2',
    title: 'Usability',
  },
  {
    field: 's3',
    title: 'Credibility (Trust)',
  },
  {
    field: 's4',
    title: 'Loyalty',
  },
  {
    field: 's5',
    title: 'Appearance',
  },
];

export const allWebsitesColumns = [
  {
    field: 'w1',
    title: 'Website Name',
    headerStyle: {
      backgroundColor: '#D4D4D4',
      color: '#323232',
      fontWeight: 'bold'
    }
  },
  {
    field: 'w2',
    title: 'Date Tested',
    headerStyle: {
      backgroundColor: '#D4D4D4',
      color: '#323232',
      fontWeight: 'bold'
    }
  },
  {
    field: 'w3',
    title: 'Study Type',
    headerStyle: {
      backgroundColor: '#D4D4D4',
      color: '#323232',
      fontWeight: 'bold'
    }
  },
  {
    field: 'w4',
    title: 'Industry',
    headerStyle: {
      backgroundColor: '#D4D4D4',
      color: '#323232',
      fontWeight: 'bold'
    }
  },
  {
    field: 'w5',
    title: 'SUPR-Q (Overall)',
    editable: 'never',
    headerStyle: {
      backgroundColor: '#8aa7d7',
      color: '#323232',
      fontWeight: 'bold'
    }
  },
  {
    field: 'w6',
    title: 'Usability',
  },
  {
    field: 'w7',
    title: 'Trust (Credibility)',
  },
  {
    field: 'w8',
    title: 'Loyalty',
  },
  {
    field: 'w9',
    title: 'Appearance',
  },
  {
    field: 'w10',
    title: 'NPS (Raw %)',
    headerStyle: {
      backgroundColor: '#D4D4D4',
      color: '#323232',
      fontWeight: 'bold'
    }
  },
];
