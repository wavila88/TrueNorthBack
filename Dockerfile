FROM node:16-alpine AS deps

ENV SWAGGER_API_URL=CdkIn-MyFar-KORB3ZUWPR09-1788869907.us-east-1.elb.amazonaws.com

WORKDIR /app
COPY package.json ./
RUN npm i install 

COPY . .

EXPOSE 80

ENV PORT 80

CMD ["npm", "start"]


# To create docker image
# docker build -t back-calculator:latest .
# docker run --publish 80:80 back-calculator:latest

#Push into ECR
# aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/p1g5b2e2
# docker tag lite-thinking:v1 public.ecr.aws/p1g5b2e2/think-lite:latest
# docker push public.ecr.aws/p1g5b2e2/think-lite:latest