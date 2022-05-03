
( load "~/quicklisp/setup.lisp" )

( ql:quickload "ltk" )

(in-package :ltk)


; (defun hello-1 ()
    ; (with-ltk ()
        ; (let (
              ; (b
                ; (make-instance
                    ; 'button
                    ; :master nil
                    ; :text "Press Me"
                    ; :command ( lambda () 
                    ; ( format t "Hello, World" ) )
    ; (grid b)
                ; )
            ; )
          ; )
        ; )
    ; )
; )

(defun hello-1()
  (with-ltk ()
            (let ((b (make-instance 'button
                                    :activebackground "red"
                                    :master nil
                                    :text "Press Me"
                                    :command (lambda ()
                                               (format t "Hello World!~&")
                                               (print (screen-width) )
                                               (wm-title 1 "LLL")
                                           ))))
              (pack b))))



; (defun canvastest()
  ; (with-ltk ()
            ; (let* ((sc (make-instance 'scrolled-canvas))
                   ; (c (canvas sc))
                   ; (line (create-line c (list 200 200 10 50 700 150)))
                   ; (polygon (create-polygon c (list 50 150 250 160 250
                                                    ; 300 50 330 )))
                   ; (text (create-text c 260 250 "Canvas test")))
              ; (pack sc :expand 1 :fill :both)
              ; (scrollregion c 0 0 800 800)
              ; )))

; (start-wish)
; (mainloop)

(hello-1)

