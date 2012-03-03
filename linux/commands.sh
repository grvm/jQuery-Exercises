##Exercise - BACKUP

tar zcfv "backup_$(date +"%d_%m_%y_%H%M")" $HOME


##Exercise - Process Count

ps aux | wc -l


##Exercise - Display HOSTNAME

hostname


##Exercise - Find bash.bashrc

find / -name 'bash.bashrc'


##Exercise - * Write a script using your favorite editor. The script should display the path to your homedirectory and the terminal type that you are using. Additionally it shows all the services started up in runlevel 3 on your system.

# Change permissions on your script so that you can run it.

# Change permission on your script so that only root user can run it.


 chmod +x file.sh
 chown root:root file.sh
 sudo chmod 764 file.sh

