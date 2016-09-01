(function() {

    var LoadPortfolio = React.createClass({

        loadNewPortfolio: function(e) {
            document.querySelector("#portfolioOutput").innerHTML = "<h1>New Portfolio!</h1>";
        },

        loadPreviousPortfolio: function(e) {
            document.querySelector("#portfolioOutput").innerHTML = "<h1>Old portofolio!</h1>";
        },

        render: function() {
            return (
                <div id="portfolio">
                    <h2>Portfolio</h2>
                    <input type="button" value="Load New Portfolio?" onClick={ this.loadNewPortfolio } />
                    <input type="button" value="Load Previously Made Portfolio?" onClick={ this.loadPreviousPortfolio } />
                </div>
            );
        }

    });

    var Options = React.createClass({

        render: function() {
            return (
                <div id="options">
                    <h2>Options</h2>

                    <label>
                        Sections Column <input type="text" />
                        <label>
                            End Column? <input type="checkbox" />
                        </label>
                    </label>

                    <label>
                        Tickets Column <input type="text" />
                        <label>
                            End Column? <input type="checkbox" />
                        </label>
                    </label>

                    <label>
                        Student Column <input type="text" />
                        <label>
                            End Column? <input type="checkbox" />
                        </label>
                    </label>

                    <label>
                        Shifts <input type="number" />
                    </label>

                    <h3>Sections</h3>

                    <label>
                        Larger Course Weight <input type="number" />
                    </label>

                    <label>
                        Smaller Course Weight <input type="number" />
                    </label>

                    <h3>Tickets</h3>

                    <label>
                        Larger Course Weight <input type="number" />
                    </label>

                    <label>
                        Smaller Course Weight <input type="number" />
                    </label>
                </div>
            );
        }

    });

    var Inputs = React.createClass({

        useFile: function(e) {
            var input = e.target,
                file = input.files[0],
                reader = new FileReader(),
                node = document.getElementById('portfolioOutput');

            reader.readAsText(file);

            reader.onload = function(){
                var text = reader.result;

                node.innerText = text;

                database.ref('portfolio').set({
                    "data": text
                });

                console.log("File Info: ", file);
                console.log("File Preview: ", reader.result.substring(0, 200));
            };
        },

        render: function() {
            return (
                <div id="inputs">
                    <h2>Inputs</h2>
                    <input onChange={ this.useFile } type="file" id="file1" />
                    <input onChange={ this.useFile } type="file" id="file2" />
                </div>
            );
        }

    });

  var App = React.createClass({

        getInitialState: function() {
            return {
                loaded: false
            }
        },

        handleDataLoaded: function() {
            this.setState({
                loaded: true
            });
        },

        componentWillMount: function() {

            var portfolioRef = database.ref('portfolio')

            portfolioRef.on("value", snap => {
                var portfolio = snap.val();
                this.state.portfolio = portfolio;
            });

            portfolioRef.on('value', this.handleDataLoaded);
        },

        render: function () {
            return (
                <div id="portfolio">
                    <h1>Portfolio Generator</h1>
                    <Options />
                    <Inputs />
                    <LoadPortfolio prevPortfolio = { this.state.portfolio } />
                    <div id="portfolioOutput"></div>
                </div>
            );
        }
    });

    ReactDOM.render( <App /> , document.querySelector("#app"));

}());
