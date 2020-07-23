var NewComponent = React.createClass({
    render: function() {
      return (
        <div>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="takequiz.css" />
          <style dangerouslySetInnerHTML={{__html: "\n    " }} />
          <div className="header">
            <div className="header-right">
              <a href="#home">Home</a>
              <a href="#create">Create Quiz</a>
              <a className="active" href="#take">Take Quiz</a>
              <a href="#manager">Quiz Manager</a>
            </div>
          </div>
        </div>
      );
    }
  });
