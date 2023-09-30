import SSH from 'simple-ssh';
var opennedConnections : SSHAgent[];
opennedConnections = [];

export class SSHAgent {
  private host: string;
  private user: string;
  private pass: string;
  private key: string|null;
  private cli: any;

  constructor(host: string, user: string, pass: string) {
    this.host = host;
    this.user = user;
    this.pass = pass;
    this.key = null;
  }

  public async connect() {
    if(this.cli != null)
      return;
    if(this.key) {
      this.cli = new SSH({
        host : this.host,
        user : this.user,
        key : this.key
      })
    }else{
      this.cli = new SSH({
        host : this.host,
        user : this.user,
        pass : this.pass
      });
    }
    opennedConnections.push(this);
  }

  public async exec(cmd: string) {
    this.cli.exec(cmd, {
      out: function(stdout: string) {
        console.log(stdout);
      }
    }).start();
  }

  public async disconnect() {
    this.cli.end();
    opennedConnections = opennedConnections.filter((item) => {
      return item != this;
    });
  }
}