.Note {
  --note-height: 88px;
  background-color: #010d1e;
  color: #cacaca;
  height: var(--note-height);
  margin-bottom: 8px;
  max-width: 380px;
  padding: 8px 0 8px 8px;
  position: relative;
}

.Note__delete {
  --note-button-height: 32px;
  background-color: #041a3a;
  border: 0;
  color: #bdbcbc;
  float: right;
  font-size: 12px;
  height: var(--note-button-height);
  position: relative;
  top: calc((var(--note-button-height) + 32px) * -1);
  transform-origin: right bottom;
  transform: rotate(-90deg);
  width: calc(var(--note-height));
}
.Note__delete:hover {
  background-color: #bd0909;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.Note__title {
  font-family: var(--custom-font);
  font-size: 20px;
  margin: 0;
  max-width: 80%;
  min-height: 24px;
}
.Note__title a {
  color: #cacaca;
  display: block;
  text-decoration: none;
}
.Note__title a:hover {
  color: #FFB72F;
}

.Note__dates {
  bottom: 8px;
  color: #a7a5a5;
  font-size: 14px;
  position: absolute;
}