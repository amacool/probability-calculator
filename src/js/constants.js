import React from "react";

export const questionHeading = [
  'Q1: EasyUse',
  'Q2: EasyNavigate',
  'Q3: InfoTrustworthy',
  'Q4: InfoCredible',
  'Q5: NPS',
  'Q6: VisitFuture',
  'Q7: FindAttractive',
  'Q8: CleanSimple'
];

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
