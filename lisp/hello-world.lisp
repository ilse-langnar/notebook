(require :cl-cffi-gtk)

;; (use-package :gtk)
;; (use-package :gdk)
;; (use-package :gdk-pixbuf)
;; (use-package :gobject)
;; (use-package :glib)
;; (use-package :gio)
;; (use-package :pango)
;; (use-package :cairo)

;; (defvar *window* (gtk-window-new :toplevel))
;; (setf (gtk-window-title *window*) "Hello World for Test")
;; (defvar *button* (make-instance'gtk-button :label "Hello World"))
;; (g-signal-connect *window* "destroy"
;;                   (lambda (widget)
;;                     (declare (ignore widget))
;;                     (format t "~%Leaving...~%")
;;                     (leave-gtk-main)))
;; (g-signal-connect *button* "clicked"
;;                   (lambda (widget)
;;                     (declare (ignore widget))
;;                     (format t "~%Clicked: Click Hello~%")
;;                     (gtk-widget-destroy *window*)))
;; (gtk-container-add *window* *button*)
;; (gtk-widget-show-all *window*)


(defpackage :try-gtk-example
  (:use :gtk :gdk :gdk-pixbuf :gobject
        :glib :gio :pango :cairo :common-lisp)
  (:export example-hello-world
           example-simple-window
           app.run))

(in-package :try-gtk-example)

(defun example-simple-window ()
  (within-main-loop
   (let (;; Create a toplevel window.
         (window (gtk-window-new :toplevel)))
     ;; Signal handler for the window to handle the signal "destroy".
     (g-signal-connect window "destroy"
                       (lambda (widget)
                         (declare (ignore widget))
                         (leave-gtk-main)))
     ;; Show the window.
     (gtk-widget-show-all window))))

(defun example-hello-world ()
  (within-main-loop
   (let (;; Create a toplevel window, set a border width.
         (window (make-instance 'gtk-window
                                :type :toplevel
                                :title "Hello World"
                                :default-width 250
                                :border-width 12))
         ;; Create a button with a label.
         (button (make-instance 'gtk-button :label "Hello World")))
     ;; Signal handler for the button to handle the signal "clicked".
     (g-signal-connect button "clicked"
                       (lambda (widget)
                         (declare (ignore widget))
                         (format t "Hello world.~%")
                         (gtk-widget-destroy window)))
     ;; Signal handler for the window to handle the signal "destroy".
     (g-signal-connect window "destroy"
                       (lambda (widget)
                         (declare (ignore widget))
                         (leave-gtk-main)))
     ;; Signal handler for the window to handle the signal "delete-event".
     (g-signal-connect window "delete-event"
                       (lambda (widget event)
                         (declare (ignore widget event))
                         (format t "Delete Event Occured.~%")
                         +gdk-event-stop+))
     ;; Put the button into the window.
     (gtk-container-add window button)
     ;; Show the window and the button.
     (gtk-widget-show-all window))))




;; (defun app.run nil
;;   (let ((window (make-instance 'gtk-window :type :toplevel
;;                                :title "Hello World for test"))
;;         (button (make-instance 'gtk-button :label "Hello World")))
;;     (g-signal-connect window "destroy"
;;                       (lambda (w)
;;                         (declare (ignore w))
;;                         (format t "~%Leaving....~%")
;;                         (leave-gtk-main)))
;;     (g-signal-connect button "clicked"
;;                       (lambda (w)
;;                         (declare (ignore w))
;;                         (format t "~%Clicked: Hello World.~%")))
;;     (gtk-container-add window button)
;;     (gtk-widget-show-all window)
;;     (gtk-main))
;;   0)


;; (defun app.run nil
;;   (let ((window (make-instance 'gtk-window :type :toplevel
;;                                :title "Hello World for test"))
;;         (button (make-instance 'gtk-button :label "Hello World")))
;;     (g-signal-connect window "destroy"
;;                       (lambda (w)
;;                         (declare (ignore w))
;;                         (format t "~%Leaving....~%")
;;                         (leave-gtk-main)))
;;     (g-signal-connect button "event"
;;                       (lambda (widget event)
;;                         (declare (ignorable widget))
;;                         (format t "~%Event: ~A~%" event)))
;;     (g-signal-connect button "clicked"
;;                       (lambda (w)
;;                         (declare (ignore w))
;;                         (format t "~%Clicked: Hello World.~%")))
;;     (gtk-container-add window button)
;;     (gtk-widget-show-all window)
;;     (gtk-main))
;;   0)

(defvar *event-info*)

(defun app.run nil
  (within-main-loop
   (let ((window (make-instance 'gtk-window :type :toplevel
                                :title "My App Test"))
         (button (make-instance 'gtk-button :label "My App Test, Click output hello wolr.")))
     (g-signal-connect button "clicked"
                       (lambda (widget)
                         (declare (ignorable widget))
                         (format t "~&Hello, World~%")))
     (g-signal-connect window "destroy"
                       (lambda (widget)
                         (declare (ignorable widget))
                         (format t "~%Leaving....~%")
                         (leave-gtk-main)))
     (g-signal-connect button "button_press_event"
                       (lambda (widget event)
                         (declare (ignorable widget event))
                         (format t "~%Event: ~[Zero~;Left~;Middle~;Right~:;????~] ~A;~&Botton Code: ~0@*~A~%"
                                 (slot-value event 'gdk::button)
                                 (slot-value event 'type))
                         nil))
     (gtk-container-add window button)
     (gtk-widget-show-all window))))

(app.run)
