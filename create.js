var NewComponent = React.createClass({
    render: function() {
      return (
        <div>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="createpage.css" />
          <style dangerouslySetInnerHTML={{__html: "\n        " }} />
          <div className="header">
            <div className="header-right">
              <a href="#home">Home</a>
              <a className="active" href="#create">Create Quiz</a>
              <a href="#take">Take Quiz</a>
              <a href="#manager">Quiz Manager</a>
            </div>
          </div>
        </div>
      );
    }
  });
