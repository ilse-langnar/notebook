



(load "hello-world.lisp")

(defun main() 
    (try-gtk-example:app.run)
)

; (sb-ext:save-lisp-and-die "out.exe" :toplevel #'main :executable t)
; (main)

