#!/bin/bash

# set -x

export FIRST_BRAIN=""
export SECOND_BRAIN=""

export QUEUE_PATH=""
export NOTES_PATH=""
export STATISTICS_PATH=""

# First Brain Variabled
export LEARNING_RATE=1 # probability of bumpding items
export MEMORY_RATE=30
export APPLICATION_RATE=20

export INCREASE_AMOUNT=1
export DECREASE_EMOUNT=1

declare -A plugins;
# Dependencies: pandoc, rofi

# ---------------------------> Rofi <--------------------------- #
rofi_prompt() {

    echo "" | rofi -dmenu -location 2 -i -terminal terminator --fixed-num-lines -width 70 -show-icons -show run -config $SECOND_BRAIN/config.rasi -sidebar-mode -kbclear-line "Mod3+Control+u" -kb-secondary-paste "Mod3+Control+v" -kb-clear-line "Mod3+Control+u" -kb-move-front "Mod3+Control+a" -kb-move-end "Mod3+Control+e" -kb-move-word-back "Mod3+Alt+b" -kb-move-word-forward "Mod3+Alt+f" -kb-move-char-back "Mod3+Left" -kb-move-char-forward "Mod3+Right" -kb-remove-word-back "Mod3+Control+Alt+h" -kb-remove-word-forward "Mod3+Control+Alt+d" -kb-remove-char-forward "Mod3+Delete" -kb-remove-char-back "Mod3+BackSpace,Mod3+Shift+BackSpace,Mod3+Control+BackSpace" -kb-accept-entry "Mod3+Return" -kb-accept-entry-continue "Mod3+Shift+Return" -kb-mode-next "Mod3+Shift+Tab" -kb-mode-previous "Mod3+Shift+Control+Tab" -kb-toggle-case-sensitivity "Mod3+grave" -kb-delete-entry "Mod3+Shift+Delete" -kb-row-left "Mod3+Control+Page_Up" -kb-row-right "Mod3+Control+Page_Down" -kb-row-up "Mod3+Up" -kb-row-down "Mod3+Down" -kb-row-tab "Mod3+Tab" -kb-page-prev "Mod3+Page_Up" -kb-page-next "Mod3+Page_Down" -kb-row-first "Mod3+Home" -kb-row-last "Mod3+End" -kb-row-select "Mod3+Control+space" -kb-cancel "Mod3+Escape" -kb-custom-1 "Mod3+Alt+1" -kb-custom-2 "Mod3+Alt+2" -kb-custom-3 "Mod3+Alt+3" -kb-custom-4 "Mod3+Alt+4" -kb-custom-5 "Mod3+Alt+5" -kb-custom-6 "Mod3+Alt+6" -kb-custom-7 "Mod3+Alt+7" -kb-custom-8 "Mod3+Alt+8" -kb-custom-9 "Mod3+Alt+9" -kb-custom-10 "Mod3+Alt+0" -kb-custom-11 "Mod3+Alt+Shift+1" -kb-custom-12 "Mod3+Alt+Shift+2" -kb-custom-13 "Mod3+Alt+Shift+3" -kb-custom-14 "Mod3+Alt+Shift+4" -kb-custom-15 "Mod3+Alt+Shift+5" -kb-custom-16 "Mod3+Alt+Shift+6" -kb-custom-18 "Mod3+Alt+Shift+8" -kb-custom-17 "Mod3+Alt+Shift+7" -kb-custom-19 "Mod3+Alt+Shift+9"
}

rofi_list() {
    rofi -dmenu -location 2 -i -terminal terminator -show-icons --fixed-num-lines -width 70 -show run -config $SECOND_BRAIN/config.rasi -sidebar-mode -kbclear-line "Mod3+Control+u" -kb-secondary-paste "Mod3+Control+v" -kb-clear-line "Mod3+Control+u" -kb-move-front "Mod3+Control+a" -kb-move-end "Mod3+Control+e" -kb-move-word-back "Mod3+Alt+b" -kb-move-word-forward "Mod3+Alt+f" -kb-move-char-back "Mod3+Left" -kb-move-char-forward "Mod3+Right" -kb-remove-word-back "Mod3+Control+Alt+h" -kb-remove-word-forward "Mod3+Control+Alt+d" -kb-remove-char-forward "Mod3+Delete" -kb-remove-char-back "Mod3+BackSpace,Mod3+Shift+BackSpace,Mod3+Control+BackSpace" -kb-accept-entry "Mod3+Return" -kb-accept-entry-continue "Mod3+Shift+Return" -kb-mode-next "Mod3+Shift+Tab" -kb-mode-previous "Mod3+Shift+Control+Tab" -kb-toggle-case-sensitivity "Mod3+grave" -kb-delete-entry "Mod3+Shift+Delete" -kb-row-left "Mod3+Control+Page_Up" -kb-row-right "Mod3+Control+Page_Down" -kb-row-up "Mod3+Up" -kb-row-down "Mod3+Down" -kb-row-tab "Mod3+Tab" -kb-page-prev "Mod3+Page_Up" -kb-page-next "Mod3+Page_Down" -kb-row-first "Mod3+Home" -kb-row-last "Mod3+End" -kb-row-select "Mod3+Control+space" -kb-cancel "Mod3+Escape" -kb-custom-1 "Mod3+Alt+1" -kb-custom-2 "Mod3+Alt+2" -kb-custom-3 "Mod3+Alt+3" -kb-custom-4 "Mod3+Alt+4" -kb-custom-5 "Mod3+Alt+5" -kb-custom-6 "Mod3+Alt+6" -kb-custom-7 "Mod3+Alt+7" -kb-custom-8 "Mod3+Alt+8" -kb-custom-9 "Mod3+Alt+9" -kb-custom-10 "Mod3+Alt+0" -kb-custom-11 "Mod3+Alt+Shift+1" -kb-custom-12 "Mod3+Alt+Shift+2" -kb-custom-13 "Mod3+Alt+Shift+3" -kb-custom-14 "Mod3+Alt+Shift+4" -kb-custom-15 "Mod3+Alt+Shift+5" -kb-custom-16 "Mod3+Alt+Shift+6" -kb-custom-18 "Mod3+Alt+Shift+8" -kb-custom-17 "Mod3+Alt+Shift+7" -kb-custom-19 "Mod3+Alt+Shift+9" # -kb-accept-custom "Mod3+Control+Return"
}

ask() {
    result=$(echo "" | rofi_prompt )
    echo "$result"
}
# ---------------------------> Rofi <--------------------------- #


check_probability() {
    number="$1"

    random_number=$( shuf -i 1-100 -n 1)

    if [[  $number -gt $random_number ]]; then
        echo "true"
    else
        echo "false"
    fi
}


# ---------------------------> Statistic/Time Tracking <--------------------------- #
start_telemetry_collection() {
    time=$(date  +%Y%m%d%H%M%S)
    start="$SECONDS"
}

stop_teletry_collection() {

    duration=$(( SECONDS - start ))
    item=$( get_queue_last_item )

    # Don't log + and -
    [[ "$action" = "+" || "$action" = "-" ]] && exit 1

    if [[ "$target" = "ir" ]]; then
        echo "$time: /$target/$action/$duration/$item" >> "$STATISTICS_PATH"
    elif [[ "$target" = "z" ]]; then
        # echo "$time: /$target/$ENTRY/$duration/$item" >> "$SECOND_BRAIN/statistics"
        echo ""
    fi
}
# ---------------------------> Statistic/Time Tracking <--------------------------- #


# ---------------------------> Utils <--------------------------- #
wait_until_closed() {
    wait
}

notify() {

    time="$2"
    notify-send "$1"

    # sleep 1
    sleep 1

    kill -9 $(pidof notify-osd )
}
# ---------------------------> Utils <--------------------------- #


# ---------------------------> Filters <--------------------------- #
trim_whitespace() {
    normalized=$( echo "$1" | sed 's/\n//' ) # with sed
    echo "$normalized"
}
# ---------------------------> Filters <--------------------------- #


# ---------------------------> What PDf file is currently Open? <--------------------------- #
get_last_item() {
    file=$( cat "$QUEUE_PATH" | tail -n 1 )
        file=$( echo "$file" | cut -d/ -f 1 )
    echo "$file"
}
# ---------------------------> What PDf file is currently Open? <--------------------------- #


# ---------------------------> Bullet <--------------------------- #
get_bullet_id() {
    id=$(echo "$1" | cut -d: -f 1 )
    id_without_whitespace=$( trim_whitespace "$id" )
    echo "$id_without_whitespace"
}
# ---------------------------> Bullet <--------------------------- #


# ---------------------------> Extracts <--------------------------- #
create_extract() {
    file=$( get_last_item )

    # Bugfix: don't allow files be named 123123.(No Such file or directory) nor 12930.urandom
    create_pdf_from_png "$file"
}

create_pdf_from_png() {
    # TODO: Maybe I should automatically add the tags from its parent?

    file="$1"
    extract_id="$RANDOM"

    if [[ "$file" =~ "(No" ]] ; then
        file="$RANDOM.lol.random.pdf"
    fi

    gnome-screenshot -a -f "$FIRST_BRAIN/$file.$extract_id.png"
    convert "$FIRST_BRAIN/$file.$extract_id.png" "$FIRST_BRAIN/$extract_id.$file"

    sleep 1

    # Automatically Add when from PNG->PDF
    if [[ -f "$FIRST_BRAIN/$extract_id.$file" ]]; then

        parent=$( cat "$QUEUE_PATH" | ag -Q "$file" | head -n 1 )
        topics=$( echo "$parent" | cut -d/ -f 3 )

        if [[ "$topics" != "" ]]; then
            echo "$extract_id.$file/1/$topics/" >> "$QUEUE_PATH"
        fi

    fi

    gvfs-trash "$FIRST_BRAIN/$file.$extract_id.png" # Remove leftover
}

# ---------------------------> Extracts <--------------------------- #


# ---------------------------> First Brain Queue <--------------------------- #
# BUGFIX: when the item in the queue has not a file in irq/ we can't open something that does not exists
remove_bad_item() {
    item="$1"

    # BUGFIX: avoid those: "the file does not exists"
    if [[ -f "$FIRST_BRAIN/$item" ]]; then
        echo "$item"
    else
        remove_item_from_queue "$item"
        item=$( cat "$QUEUE_PATH" | head -n 1 ) # Get first item( scheduled for now )
        item=$( echo "$item"        | cut -d/ -f 1 )
        echo "$item"
    fi
}

before_read_queue() {

    # wait_until_closed # BUGFIX:

    item=$( cat "$QUEUE_PATH" | head -n 1 ) # Get first item( scheduled for now )
        interest=$( echo "$item"    | cut -d/ -f 2 ) # Extract interest
        topics=$( echo "$item"    | cut -d/ -f 3 ) # Extract interest

    item=$( echo "$item"        | cut -d/ -f 1 ) # Get pure name

    item=$( remove_bad_item "$item" )
    echo "$interest"
    echo "$item"

    if [[ "$interest" =~ "-" ]]; then # is negative
        echo 1

        # === Negavitve  Interest === #
        interest=$(( $interest * -1  )) # cast to positive
        random_number=$( shuf -i 1-100 -n 1)

        # notify-send "random: $random_number"

        # -1 = 90% of happening
        if [[ $interest = 1 ]]; then

            if [[ $random_number -gt 10 ]]; then
                read_queue "$item" "-$interest" "$topics"
            else
                move_to_last "$item" "-$interest" "$topics"
                before_read_queue
            fi

        fi

        # -2 = 50% of happening
        if [[ $interest = 2 ]]; then

            if [[ $random_number -gt 50 ]]; then
                read_queue "$item" "-$interest" "$topics"
            else
                move_to_last "$item" "-$interest" "$topics"
                before_read_queue
            fi

        fi

        if [[ $interest = 3 ]]; then # -3 = 25% of happening

            if [[ $random_number -gt 75 ]]; then
                read_queue "$item" "-$interest" "$topics"
            else
                move_to_last "$item" "-$interest" "$topics"
                before_read_queue
            fi

        fi

        if [[ $interest = 4 ]]; then # -4 = 10% of happening

            if [[ $random_number -gt 90 ]]; then
                read_queue "$item" "-$interest" "$topics"
            else
                move_to_last "$item" "-$interest" "$topics"
                before_read_queue
            fi

        fi

        if [[ $interest = 5 ]]; then # -5 = 1% of happening

            if [[ $random_number -gt 99 ]]; then
                read_queue "$item" "-$interest" "$topics"
            else
                move_to_last "$item" "-$interest" "$topics"
                before_read_queue
            fi
        fi

    else
        # === Positive Interest === #
        read_queue "$item" "$interest" "$topics"
    fi
}

read_queue() {

    item="$1"
    interest="$2"
    topics="$3"

    open_item "$item" # Open it
    move_to_last "$item" "$interest" "$topics" # re-schedule-it
}

# An Interest of 1 -> new item, non-1 is "seen"
mark_item_as_seen() {
    item="$1"
    interest="$2"

    if [[ "$interest" = 1 || "$interest" = "1" ]]; then
        increase_interest_on_last_item 1
    fi

}

move_positive_interest_up() {

    index=0
    cat "$QUEUE_PATH" | while IFS= read -r file; do
        ((++index))

        interest=$( echo "$file"    | cut -d/ -f 2 )
        item=$( echo "$file"        | cut -d/ -f 1 )

        [[ "$interest" =~ "-" ]] && continue
        # [[ "$interest" != 1 && "$interest" != "1" ]] && continue
        # TODO: 1 = low change, 5 = certain

        previous_index=$((--index))
        sed -i -n "$previous_index{h;n;G};p" "$QUEUE_PATH"
    done

    notify-send "Bumped"
}

get_queue_last_item() {
    item=$( cat "$QUEUE_PATH" | tail -n 1 )
    echo "$item"
}

remove_item_from_queue() {
    item="$1"
    sed -i "/$item/d" "$QUEUE_PATH"
}

shift_queue() {
    # TODO:
    item="$1"
    sed -i "/$item/d" "$QUEUE_PATH"
}

pop_queue() {

    last_item=$( cat "$QUEUE_PATH" | tail -n 1 )
    last_item=$( echo "$last_item" | cut -d/ -f 1  )

    # BUGFIX: prevent the catastrophy
    if [[ "$last_item" = "/" ]]; then
        exit 1
    fi

    # file only not dir
    if [[ -f "$FIRST_BRAIN/$last_item" ]]; then

        notify "$FIRST_BRAIN/$last_item"

        # Remove item from q
        remove_item_from_queue "$last_item"

        # Move actual file to trash
        gvfs-trash "$FIRST_BRAIN/$last_item"
    else

        # Remove item from q
        remove_item_from_queue "$last_item"

    fi
}

open_item() {

    item="$1"
        # item=$( echo "$item" | cut -d/ -f 1  )

    if [[ -f "$FIRST_BRAIN/$item" ]]; then
        :
    else
        # Notify
            notify "Deleted: $FIRST_BRAIN/$item"

        # BUGFIX: Prevent deleting First Brain
            [[ "$item" = "" ]] && exit 1

        # Move to Trash
            gvfs-trash "$FIRST_BRAIN/$item"

        # BUGFIX: Avoid tryign to open it.
        exit 1
    fi

    if [[ "$item" =~ ".pdf" ]]; then
        okular "$FIRST_BRAIN/$item" > /dev/null &
    elif [[  "$item" =~ ".mp4"  || "$item" =~ ".mp3" ]]; then
        vlc "$FIRST_BRAIN/$item" > /dev/null &
    elif [[ "$item" =~ ".sh" ]]; then
        bash "$FIRST_BRAIN/$item"
    elif [[ "$item" =~ ".html" ]]; then
        xdg-open "$FIRST_BRAIN/$item"
    elif [[ "$item" =~ ".png" || "$item" =~ ".jpeg" || "$item" =~ ".jpg" || "$item" =~ ".gif" || "$item" =~ ".svg" ]]; then
        feh "$FIRST_BRAIN/$item"
    else
        xdg-open "$FIRST_BRAIN/$item"
    fi

}

# WIll take an item from the first line and throw it at the last line
move_to_last() {
    item="$1"
    interest="$2"
    topics="$3"

    sed -i '1d' "$QUEUE_PATH"

    if [[ "$topics" = "" ]]; then
        echo "$item/$interest/$topics" >> "$QUEUE_PATH"
    else
        echo "$item/$interest/$topics/" >> "$QUEUE_PATH"
    fi

}

decrease_interest_on_last_item() {

    # Decrease Amount
        number="$1"
        [[ "$1" = "" ]] && number=$DECREASE_EMOUNT
        number=$DECREASE_EMOUNT

    item=$( get_queue_last_item )
        name=$( echo "$item" | cut -d/ -f 1 )
        interest=$( echo "$item" | cut -d/ -f 2 )
        topics=$( echo "$item" | cut -d/ -f 3 )

    new_interest=$( expr $interest - $number  )
    len=${#new_interest}

    # BUGFIX: Makes sure it does not goes to 0
    [[ $interest -lt -4 ]] && exit 1

    remove_item_from_queue "$name.*"

    if [[ "$topics" = "" ]]; then
        echo "$name/$new_interest/" >> "$QUEUE_PATH"
    else
        echo "$name/$new_interest/$topics/" >> "$QUEUE_PATH"
    fi

    # notify "$new_interest"
}

increase_interest_on_last_item() {

    # Increase Amount
        number="$1"
        [[ "$number" = "" ]] && number=$INCREASE_AMOUNT

    item=$( get_queue_last_item )
        name=$( echo "$item" | cut -d/ -f 1 )
        interest=$( echo "$item" | cut -d/ -f 2 )
        topics=$( echo "$item" | cut -d/ -f 3 )

    new_interest=$( expr $interest + $number  )

    # BUGFIX: Don't increase too much
    [[ $interest -gt 4 ]] && exit 1

    remove_item_from_queue "$name.*"

    if [[ "$topics" = "" ]]; then
        echo "$name/$new_interest/" >> "$QUEUE_PATH"
    else
        echo "$name/$new_interest/$topics/" >> "$QUEUE_PATH"
    fi

    # notify "$new_interest"
}

add_topic_on_last_item() {

    last_item=$( cat "$QUEUE_PATH" | tail -n 1 )
        item=$( echo "$last_item" | cut -d/ -f 1  )
        interest=$( echo "$last_item" | cut -d/ -f 2  )
        topics=$( echo "$last_item" | cut -d/ -f 3  )

    if [[ "$topics" != "" ]]; then
        new_topic=$( echo "@" | rofi_list )
    else
        new_topic=$( echo "" | rofi_list )
    fi

    new_topic="$new_topic"

    # BUGFIX: open but close without writing.
    if [[ "$new_topic" = "" ]];  then
        exit 1
    fi

    if [[ "$topics" != "" ]]; then

        # We have topics already, append

        # Exist if duplicated
            [[ "$topics" =~ "$new_topic" ]] && exit 1

        # Add new topic to old topics
            topics="$topics,$new_topic"

        # Delete line
            remove_item_from_queue "$item"

        # Append
            echo "$item/$interest/$topics/" >> "$QUEUE_PATH"

        # Notify
            # notify "$topics"
    else
        # We don't have topics, just add

        # Delete Line
            remove_item_from_queue "$item"

        # Append
            echo "$last_item$new_topic/" >> "$QUEUE_PATH"

        # Notify
            # notify "$new_topic"
    fi

}
# ---------------------------> First Brain Queue <--------------------------- #



# ---------------------------> Second Brain  <--------------------------- #
open_rofi() {
    ENTRY=$( rofi_prompt )
}

add_note() {

    bash "$SECOND_BRAIN/hooks.sh"

    if [[ "$ENTRY" =~ "#ref" ]]; then
        # You want to collect reference information with the note automatically.
        file=$( get_last_item )
        ENTRY="$ENTRY from {$file}"
    fi

    # Hooks -> as you add a note to your second brain, do something with note like analyzing. ->
    # We may have a hooks.sh file where we'll scan there for any scripts
    if [[ "$ENTRY" =~ "#ir" ]]; then
        echo "$ENTRY" > "$SECOND_BRAIN/tmp.md"

        name="$RANDOM.note.png"
        extract_id="$RANDOM"

        text=$( cat "$SECOND_BRAIN/tmp.md" )

        # TXT to PNG
            convert -size 860x860 xc:white -font "FreeMono" -pointsize 12 -fill black -annotate +15+15 "$text" "$FIRST_BRAIN/$name"

        # PNG to PDF
            convert "$FIRST_BRAIN/$name" "$FIRST_BRAIN/$extract_id.note.pdf"

        # Delete PNG
            gvfs-trash "$FIRST_BRAIN/$name"

        # Add
            echo "$extract_id.note.pdf/1/" >> "$QUEUE_PATH"
    fi

    # Random Query
    if [[ "${ENTRY:0:1}" = "#" ]]; then

        [[ "$ENTRY" =~ "#ir" ]] && exit

        random_item=$(cat "$QUEUE_PATH" | ag -Q "$ENTRY" | shuf | head -n 1 )
        [[ "$random_item" = "" ]] && exit 1
            item=$( echo "$random_item" | cut -d/ -f 1 )
            interest=$( echo "$random_item" | cut -d/ -f 2 )
            topics=$( echo "$random_item" | cut -d/ -f 3 )

        # if [[ "$interest" =~ "-" ]]; then
            # move_to_last "$item" "-$interest" "$topics" # re-schedule-it
        # else
        # fi

        move_to_last "$item" "$interest" "$topics" # re-schedule-it
        open_item "$item" # Open it
        exit 1
    fi

    if [[ "${#ENTRY}" -gt 1 ]]; then
        ENTRY=$(printf " %s" $ENTRY)
        echo "$time: $ENTRY" >> "$NOTES_PATH"
    fi

}

query_file() {

    file=$( cat "$QUEUE_PATH" | rofi_list )
        [[ "$file" = "" ]] && exit 1

    interest=$( echo "$file"    | cut -d/ -f 2 ) # Extract interest
    topics=$( echo "$file"    | cut -d/ -f 3 ) # Extract topics

    file=$( echo "$file"    | cut -d/ -f 1 ) # Extract interest

    # can't use read_queue because it's a simple pop/shift operation.
    open_item "$file" # Open it
    # mark_item_as_seen "$file" "$interest" # item/1 = item/2

    sed -i "/$file/d" "$QUEUE_PATH"

    if [[ "$topic" = "" ]]; then
        echo "$file/$interest/" >> "$QUEUE_PATH"
    else
        echo "$file/$interest/$topics/" >> "$QUEUE_PATH"
    fi
}

shuffle_queue() {

    list=""
    # BUG: When I have extracts without scanning the book, I'll not be able to scan it on shuffle.
    # TODO: Fix this, I need to shuffle the itmes,
    ls "$FIRST_BRAIN"  | while IFS= read -r file; do

        if [[ -z $(ag -Q "$file" "$QUEUE_PATH") ]]; then
            echo "$file/1/" >> "$QUEUE_PATH"
        fi

    done

    shuffled=$(cat "$QUEUE_PATH" | uniq | shuf )
    echo "$shuffled" > "$QUEUE_PATH"

    notify "Shuffled"
}

read_last_item() {

    last=$( cat "$QUEUE_PATH" | tail -n 1)
        last=$( echo "$last" | cut -d/ -f 1 )
        interest=$( echo "$last" | cut -d/ -f 2 )
        topics=$( echo "$last" | cut -d/ -f 3 )

    if [[ -f "$FIRST_BRAIN/$last" ]]; then
        # read_queue  "$last" "$interest" "$topics"
        open_item "$last" # Open it
    else
        notify-send "No file named: $last"
    fi

}
# ---------------------------> Second Brain <--------------------------- #


# ---------------------------> Main Function <--------------------------- #
parse() {

    target="$1"
    action="$2"
    arguments="$3"

    start_telemetry_collection


    if [[ "$target" = "first" ]];  then
        first_brain "$action" "$arguments"
    elif [[ "$target" = "second" ]]; then
        second_brain "$action" "$arguments"
    fi

    wait_until_closed # BUGFIX:
    stop_teletry_collection
}
# ---------------------------> Main Function <--------------------------- #

    # ---------------------------> First Brain Commands <--------------------------- #
    first_brain() {

        action="$1"
        arguments="$2"

        if [[ "$action" = "write" ]]; then
            create_extract
        elif [[ "$action" = "read" ]]; then
            before_read_queue
        elif [[ "$action" = "delete" ]]; then
            pop_queue
        elif [[ "$action" = "query" ]]; then
            query_file
        elif [[ "$action" = "shuffle" ]]; then
            shuffle_queue
        elif [[ "$action" = "read-last" ]]; then
            read_last_item
        elif [[ "$action" = "increase-last" ]]; then
            increase_interest_on_last_item
        elif [[ "$action" = "decrease-last" ]]; then
            decrease_interest_on_last_item
        elif [[ "$action" = "add-topic" ]]; then
            add_topic_on_last_item
        fi

        last="$(cat $QUEUE_PATH | tail -n 1 )"
            item=$( echo "$last" | cut -d/ -f 1 )
            interest=$( echo "$last" | cut -d/ -f 2 )
            topics=$( echo "$last" | cut -d/ -f 3 )
        notify "$interest/$topics"

    }
    # ---------------------------> First Brain Commands <--------------------------- #


    # ---------------------------> Second Brain Commands <--------------------------- #
    second_brain() {

        action="$1"
        arguments="$2"

        if [[ "$action" = "open" ]]; then
            open_rofi
        fi

        if [[ ${ENTRY:0:1} = "=" || "$action" = "run-plugin" ]]; then
            call_plugin
        elif [[ "$ENTRY" = "+" ]]; then
            add_plugins "$arguments"
        else
            add_note
        fi

    }
    # ---------------------------> Second Brain Commands <--------------------------- #

call_plugin() {

    argument="$ENTRY"
    string="${argument: 1}" # Remove the first letter

    plugin=$(echo ${plugins[$string]})

    # Exec script for plugin
    if [[ "$plugin" != "" ]]; then
        bash "$SECOND_BRAIN/$plugin"
    fi
}

add_plugins() {

    arguments="$1"
    key=$( rofi_prompt )
    script=$( rofi_prompt )

    # Quine
    sed -i "/declare\ -A\ plugins;/a plugins[$key]=\"$script\" " $0
}

parse "$1" "$2" "$3"
