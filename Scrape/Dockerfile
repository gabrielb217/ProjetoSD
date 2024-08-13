# Use the official Python image from the Docker Hub
FROM python:3.9

# Set the working directory in the container
WORKDIR /Scrape
RUN apt-get update && apt-get install -y nano cron bash wget && rm -rf /var/lib/apt/lists/*

# Copia todas as dependencias python
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Make the scrape.sh script executable
RUN chmod +x scrape.sh

# Add crontab file in the cron directory
COPY crontab /etc/cron.d/scrape-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/scrape-cron

# Apply the cron job
RUN crontab /etc/cron.d/scrape-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the cron and the scrape.sh script
CMD cron && tail -f /var/log/cron.log