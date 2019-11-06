import React from "react";

export const questionDesc = [
  'This website is easy to use.',
  'It is easy to navigate within the website.',
  'The information on this website is trustworthy.',
  'The information on this website is credible.',
  'How likely are you to recommend this website to a friend or colleauge?',
  'I will likely visit this website in the future.',
  'I find the website to be attractive.',
  'The website has a clean and simple presentation.'
];

const THead = ({ title, description }) => (
  <div style={{ minHeight: '180px' }}>
    <h3>{title}</h3>
    <span><i>{description}</i></span>
  </div>
);

export const rawDataColumns = [
  {
    dataField: 'q1',
    text: <THead
      title='Q1: EasyUse'
      description={questionDesc[0]}
    />,
    heading: 'Q1: EasyUse',
    sort: true,
    onSort: (field, order) => {
      // ...
    }
  },
  {
    dataField: 'q2',
    text: <THead
      title='Q2: EasyNavigate'
      description={questionDesc[1]}
    />,
    heading: 'Q2: EasyNavigate',
    sort: true,
    onSort: (field, order) => {
      // ...
    }
  },
  {
    dataField: 'q3',
    text: <THead
      title='Q3: InfoTrustworthy'
      description={questionDesc[2]}
    />,
    heading: 'Q3: InfoTrustworthy',
    sort: true,
    onSort: (field, order) => {
      // ...
    }
  },
  {
    dataField: 'q4',
    text: <THead
      title='Q4: InfoCredible'
      description={questionDesc[3]}
    />,
    heading: 'Q4: InfoCredible',
    sort: true,
    onSort: (field, order) => {
      // ...
    }
  },
  {
    dataField: 'q5',
    text: <THead
      title='Q5: NPS'
      description={questionDesc[4]}
    />,
    heading: 'Q5: NPS',
    sort: true,
    onSort: (field, order) => {
      // ...
    }
  },
  {
    dataField: 'q6',
    text: <THead
      title='Q6: VisitFuture'
      description={questionDesc[5]}
    />,
    heading: 'Q6: VisitFuture',
    sort: true,
    onSort: (field, order) => {
      // ...
    }
  },
  {
    dataField: 'q7',
    text: <THead
      title='Q7: FindAttractive'
      description={questionDesc[6]}
    />,
    heading: 'Q7: FindAttractive',
    sort: true,
    onSort: (field, order) => {
      // ...
    }
  },
  {
    dataField: 'q8',
    text: <THead
      title='Q8: CleanSimple'
      description={questionDesc[7]}
    />,
    heading: 'Q8: CleanSimple',
    sort: true,
    onSort: (field, order) => {
      // ...
    }
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
