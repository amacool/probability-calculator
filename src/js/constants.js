import React from "react";

export const questionHeading = [
  {
    title: 'Q1: EasyUse',
    desc: 'This website is easy to use.',
  },
  {
    title: 'Q2: EasyNavigate',
    desc: 'It is easy to navigate within the website.',
  },
  {
    title: 'Q3: InfoTrustworthy',
    desc: 'The information on this website is trustworthy.',
  },
  {
    title: 'Q4: InfoCredible',
    desc: 'The information on this website is credible.',
  },
  {
    title: 'Q5: NPS',
    desc: 'How likely are you to recommend this website to a friend or colleauge?',
  },
  {
    title: 'Q6: VisitFuture',
    desc: 'I will likely visit this website in the future.',
  },
  {
    title: 'Q7: FindAttractive',
    desc: 'I find the website to be attractive.',
  },
  {
    title: 'Q8: CleanSimple',
    desc: 'The website has a clean and simple presentation.'
  }
];

export const defaultColumnOrder = [0, 1, 2, 3, 4, 5, 6, 7];

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
