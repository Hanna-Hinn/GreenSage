import React from "react";

export default function ChatBox() {

  return (
    <div className="window">
      <aside className="conv-list-view">
        <ul className="conv-list">
          <li className="conv-element">
            <div className="status">
              <div className="meta">
                <p>Name 1</p>
              </div>
            </div>
          </li>
          <li className="selected">
            <div className="status">
              <div className="meta">
                <p>Tim Pietrusky</p>
              </div>
            </div>
          </li>
          <li>
            <div className="status">
              <div className="meta">
                <p>HugoGiraudel</p>
              </div>
            </div>
          </li>
        </ul>
      </aside>
      <section className="chat-view">
        <header className="chat-view__header">
          <div className="cf">
            <div className="status">
              <div className="meta">
                <div className="meta__name">Tim Pietrusky</div>
              </div>
            </div>
          </div>
        </header>
        <section className="message-view">
          {/* <div className="message--send">
            <div className="message__bubble--send">Hi Tim!</div>
            <span className="message__avatar">Hanna</span>
          </div>
          <div className="cf"></div>
          <div className="message">
            <span className="message__avatar">Tim</span>
            <div className="message__bubble">Hi</div>
          </div>
          <div className="cf"></div>
          <div className="message--send">
            <div className="message__bubble--send">How are you?</div>
            <span className="message__avatar">Hanna</span>
          </div> */}
        </section>
        <footer className="chat-view__input">
          <div className="chat-input">
            <input />
            <span className="input__emoticon"></span>
          </div>
        </footer>
      </section>
    </div>
  );
}
