
print_usage() {
    cat <<EOF
This script installs and configures the CrowdStrike Falcon Sensor for Linux.
CrowdStrike API credentials are needed to download Falcon sensor. The script recognizes the following environmental variables:
    - FALCON_CLIENT_ID
    - FALCON_CLIENT_SECRET
Optional:
    - FALCON_CID                        (default: auto)
    - FALCON_CLOUD                      (default: auto)
    - FALCON_SENSOR_VERSION_DECREMENT   (default: 0 [latest])
    - FALCON_PROVISIONING_TOKEN         (default: unset)
    - FALCON_SENSOR_UPDATE_POLICY_NAME  (default: unset)
EOF
}

# rofi
# notify-send
# okular

# gnome-screenshot -a -f "$INTEREST_REPETITION_QUEUE_PATH/$file.$extract_id.png"
# convert "$INTEREST_REPETITION_QUEUE_PATH/$file.$extract_id.png" "$INTEREST_REPETITION_QUEUE_PATH/$extract_id.$file"
# sed -i -n "$previous_index{h;n;G};p" "$ZETTELKASTEN_PATH/q"
# gvfs-trash "$INTEREST_REPETITION_QUEUE_PATH/$last_item"
# vlc "$INTEREST_REPETITION_QUEUE_PATH/$item" > /dev/null &
# bash "$INTEREST_REPETITION_QUEUE_PATH/$item"
# xdg-open "$INTEREST_REPETITION_QUEUE_PATH/$item"
# kazam

main() {

    if [ -n "$1" ]; then
        print_usage
        exit 1
    fi

    read -p 'Choose target folder: ' $REPLY
    if [[ -d "$REPLY" ]]; then
        echo "Folder choosen: ${REPLY}"
    else
        echo "[ERROR]: Could not find path: ${REPLY}"
        exit 0
    fi

    echo -n 'Installing Dependencies ... '; install_dependencies;  echo '[ Ok ]'
    echo 'Installing was succesfull'
    echo 'Try running: '
    echo '> chmod +x zir.sh'
    echo '> bash zir.sh "setup"; '
    echo '> bash zir.sh "k" '
}

install_dependencies() {
    script_dir=$(dirname "$0")
    echo "$script_dir >>>"
    curl https://github.com/CrowdStrike/falcon-linux-install-bash/blob/main/README.md > "$script_dir/zir.sh"
    # curl https://raw.githubusercontent.com/ilse-langnar/notebook/dev/javascript/cli/zir.sh > "$script_dir/zir.sh"
}

main
