## Email Routing

### TO Barabari

```mermaid
flowchart TD
  User -- Sends Email to 'x@barabariproject.org' --> Internet
  Internet -- MX records 'barabariproject.org' --> Cloudflare
  Cloudflare -- 'x' is a valid user --> Gmail
  Cloudflare -- 'x' is not a valid user --> Throw
```

ADDING a new user to routing
- Go to Cloudflare console
- Click on `barabariproject.org`
- Click on `Email Routing`
- Go to `Routing Rules` tab
- Add a new rule

REMOVING a new user to routing
- Go to Cloudflare console
- Click on `barabariproject.org`
- Click on `Email Routing`
- Go to `Routing Rules` tab
- Click on `edit` for the user
- Click on `Delete`

For more see [Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/)

### FROM Barabari

```mermaid
flowchart TD
  User -- Sends Email to 'x@barabariproject.org' --> Gmail
  Gmail -- Verifies with 'barabariproject.org' --> Cloudflare
  Cloudflare -- 'x' is a valid user --> Gmail2
  Cloudflare -- 'x' is not a valid user --> Throw

  Gmail2 -- Sends via set SMTP Server --> SMTPServer
  SMTPServer -- Sends Email to 'User' --> Internet
```


- Go to https://mail.google.com/mail/u/3/#settings/accounts
- Click add another email address
- Add name and email address
- **UN**select `Treat as an alias` (next)
- Next
- - SMTP Server: `smtp.gmail.com`
- - Username is normal barabariproject@gmail email
- - Password is APP PASSWORD For gmail (generated earlier)
- Follow rest of steps and complete


### First time setups
- [Cloudflare](https://www.youtube.com/watch?v=nNGcvz1Sc_8)
- [Gmail](https://community.cloudflare.com/t/solved-how-to-use-gmail-smtp-to-send-from-an-email-address-which-uses-cloudflare-email-routing/382769)