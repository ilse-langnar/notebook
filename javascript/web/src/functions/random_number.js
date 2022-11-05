import printf               from "@/functions/printf.js"

export default function random_integer(min = 1, max = 100 ) {

    if (min==null && max==null)
        return 0;

    if (max == null) {
        max = min;
        min = 0;

    }
    return min + Math.floor(Math.random() * (max - min + 1))
}
