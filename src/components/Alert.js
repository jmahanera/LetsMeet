import { Component } from 'react';

// Base Alert class for styling and rendering alerts
class Alert extends Component {
  constructor(props) {
    super(props);
    // Initialize color, background color, and border color properties
    this.color = null;
    this.bgColor = null;
    
  }

  // Get the style object for the alert based on color, background color, and border color
  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: null, 
      textAlign: "center",
      fontSize: "12px",
      margin: "10px",
      padding: "10px",
      position: "fixed",
      top: "10px",
      left: "10px"
    };
  }

  // Render the alert with the specified text and style
  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

// Subclass for rendering informational alerts with blue color and light blue background
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    // Set color, background color, and border color for informational alerts
    this.color = 'rgb(0, 0, 255)'; // blue
    this.bgColor = 'rgb(220, 220, 255)'; // light blue
    
  }
}

// Subclass for rendering error alerts with white color and red background
class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    // Set color and background color for error alerts
    this.color = 'rgb(255, 255, 255)'; // white
    this.bgColor = 'rgb(230, 0, 0)'; // red
  }
}

// Subclass for rendering warning alerts with white color and a yellow background
class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    // Set color and background color for warning alerts
    this.color = 'white';
    this.bgColor = '#eacd65';
  }
}

// Export the subclasses for use in other components
export { InfoAlert, ErrorAlert, WarningAlert };
