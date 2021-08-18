# Anova Wifi API

These commands and notes have been extracted from sniffing traffic sent to and
from the Anova device and Anova's servers. Much of the following would not be
possible without [Mark Furneaux][1] and [his video on hacking the Anova device]
[2].

## Commands

The only command that seems to be unique to the Wifi API is `get number`. The
rest of the commands can all be gotten from the [BLE API][3].

| Command          | Notes |
|------------------|-------|
| `get number`     | Get's the secret key required for the REST API and is set by the BLE `set number` command |

[1]: https://github.com/TheUbuntuGuy
[2]: https://www.youtube.com/watch?v=xDDPFHhY7ec
[3]: https://github.com/dfrankland/sous-vide/blob/master/docs/ble.md
