import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    overflow-x: hidden;
  }

  main {
    display: block;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  table{
    border-spacing: 0;
  }

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  a {
    background-color: transparent;
  }

  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }
h1,h2,h3,h4,h5,h6{
  font-family: "Josefin Sans";
}
  *{
    font-family: 'Asap', sans-serif;
  }
  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  button,
  input { /* 1 */
    overflow: visible;
  }

  button,
  select { /* 1 */
    text-transform: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.font};
    text-size-adjust: 100%;
    width: 100%;
    height: 100vh;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #525f7f;
    background-color: ${(props) => props.theme.color.white};
  }

  body {
    font-family: ${(props) => props.theme.font};
    font-weight: 400;
    letter-spacing: 0.1px;
    word-wrap: break-word;
    font-kerning: normal;
    -webkit-font-smoothing: antialiased;
    background-color: ${(props) => props.theme.color.white};
    margin: 0;
  }

  #react-paginate ul {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    padding-left: 0px;
  }

  #react-paginate li {
    display: inline-block;
    padding: 5px 2px;
    cursor: pointer;
    color: #000;
    border-radius: 10rem;
    border: 2px solid #eee;
    margin: 0 .3rem;
    a[aria-disabled="true"]{
      color: #ccc;
    }
    
    :hover,:focus{
      opacity:.8;
    }

    @media(max-width: ${(props) => props.theme.queries.i5}){
      padding: 3px 0px;  
    }
  }

  #react-paginate li > a{
    padding: 3px 10px;
    @media(max-width: ${(props) => props.theme.queries.sm}){
      padding: 3px 5px;  
    }
  }

  #react-paginate .break a {
    cursor: default;
  }

  #react-paginate li:first-of-type {
    background-color: transparent;
    margin-right: 10px;
    color: ${(props) => props.theme.color.green};
    font-weight: bold;
    border: none;
    @media(max-width: ${(props) => props.theme.queries.i5}){
      margin-right: 5px;
    }
  }

  #react-paginate li:last-of-type {
    background-color: transparent;
    color: ${(props) => props.theme.color.green};
    font-weight: bold;
    margin-left: 10px;
    border: none;
    @media(max-width: ${(props) => props.theme.queries.i5}){
      margin-left: 5px;
    }
  }

  #react-paginate .break-me {
    border: none;
  }

  #react-paginate .active {
    border: 2px solid ${(props) => props.theme.color.green};
    border-radius: 10rem;
    color: #333;
    font-weight: bold;
  }

  .carousel .thumbs {
    padding-left: 0px !important;
    margin-bottom: 0px !important;
  }

  .thumbs-wrapper {
    display: flex;
    justify-content: center;
    margin: 0 !important;
    .axis-vertical {
      margin: 0 !important;
    }
  }

  .carousel .thumb.selected, .carousel .thumb:hover {
    border: 2px solid #8E44AD !important;
  }

  .thumbs {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .thumb {
    padding: 0px !important;
    border: 0px !important;
    margin-right: 0px !important;
  }

  .css-1r7j0xj{
    margin-top: 1rem;
    position: absolute !important;
  }

  .css-h61r5z,.css-crcxu9{
    border-radius: .8rem !important;
    @media(max-width: ${(props) => props.theme.queries.md}){
      width: 95% !important;
      right: 0 !important;
    }
  }

  .css-ts8rbz-Progress{
    background-color: ${(props) => props.theme.color.green} !important;
  }

  .css-1r7j0xj{
    box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 37px !important;
    border: .5px solid #76767647;
  }

  .css-g1d714-ValueContainer{
    height: 48px;
    overflow-y: auto !important;
  }

`;
