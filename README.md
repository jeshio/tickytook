## Deploy

1. Create `.env` file by example

2. To start nginx server run command:

```bash
 docker-compose up -d --build
```

## GitLab CI

```
Based on [the article](https://angristan.xyz/build-push-docker-images-gitlab-ci/)
```

Setting the gitlab-runner in your host machine and start.

1. Create dir:

```
.
├── config
│   └── config.toml
└── docker-compose.yml
```

2. Set `docker-compose.yml` to:

```
version: '3'

services:
  gitlab-runner:
    image: gitlab/gitlab-runner:alpine-v11.2.0
    container_name: gitlab_runner
    restart: always
    volumes:
      - ./config/:/etc/gitlab-runner/
      - /var/run/docker.sock:/var/run/docker.sock
```

3. Set `config/config.toml` to:

```
concurrent = 1
```

4. Register runner:

```
docker-compose run --rm gitlab-runner register -n \
  --url https://gitlab.com/ \
  --registration-token <token> \
  --executor docker \
  --description <gitlab-runner-description> \
  --docker-image "docker:stable" \
  --docker-volumes /var/run/docker.sock:/var/run/docker.sock
```

5. Run:

```
docker-compose up -d
```

6. Set env variables at GitLab for `setup.env.sh` file.
