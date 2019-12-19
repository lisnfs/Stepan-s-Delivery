DROP TABLE public.clients;
CREATE TABLE public.clients
(
    client_id       integer                                        NOT NULL,
    client_email    character varying COLLATE pg_catalog."default" NOT NULL,
    client_discount double precision,
    client_password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Client_pkey" PRIMARY KEY (client_id),
    CONSTRAINT "Client_Email_key" UNIQUE (client_email)
) WITH ( OIDS = FALSE )
  TABLESPACE pg_default;
ALTER TABLE public.clients
    OWNER to postgres;
GRANT ALL ON TABLE public.clients TO postgres;
GRANT ALL ON TABLE public.clients TO restapi;
DROP TABLE public.dishes;
CREATE TABLE public.dishes
(
    dish_id          integer NOT NULL,
    dish_ingredients character varying COLLATE pg_catalog."default",
    CONSTRAINT dish_pkey PRIMARY KEY (dish_id)
) WITH ( OIDS = FALSE )
  TABLESPACE pg_default;
ALTER TABLE public.dishes
    OWNER to postgres;
GRANT ALL ON TABLE public.dishes TO postgres;
GRANT ALL ON TABLE public.dishes TO restapi;
DROP TABLE public.couriers;
CREATE TABLE public.couriers
(
    courier_id    integer NOT NULL,
    courier_name  character varying COLLATE pg_catalog."default",
    courier_email character varying COLLATE pg_catalog."default",
    courier_phone character varying COLLATE pg_catalog."default",
    CONSTRAINT "Courier_pkey" PRIMARY KEY (courier_id)
) WITH ( OIDS = FALSE )
  TABLESPACE pg_default;
ALTER TABLE public.couriers
    OWNER to postgres;
GRANT ALL ON TABLE public.couriers TO postgres;
GRANT ALL ON TABLE public.couriers TO restapi;
DROP TABLE public.assignedcouriers;
CREATE TABLE public.assignedcouriers
(
    courier_id integer NOT NULL,
    order_id   integer NOT NULL,
    CONSTRAINT "AssignedCourier_pkey" PRIMARY KEY (courier_id, order_id),
    CONSTRAINT "AssignedCourier_courierid_fkey" FOREIGN KEY (courier_id) REFERENCES public.couriers (courier_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "AssignedCourier_orderid_fkey" FOREIGN KEY (order_id) REFERENCES public.orders (order_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) WITH ( OIDS = FALSE )
  TABLESPACE pg_default;
ALTER TABLE public.assignedcouriers
    OWNER to postgres;
GRANT ALL ON TABLE public.assignedcouriers TO postgres;
GRANT ALL ON TABLE public.assignedcouriers TO restapi;
DROP TABLE public.orders;
CREATE TABLE public.orders
(
    order_id           integer NOT NULL,
    user_id            integer,
    order_timeorder    time without time zone,
    order_timedelivery time without time zone,
    order_address      character varying COLLATE pg_catalog."default",
    order_payment      double precision,
    order_discount     double precision,
    CONSTRAINT order_pkey PRIMARY KEY (order_id),
    CONSTRAINT "order_UserId_fkey" FOREIGN KEY (user_id) REFERENCES public.clients (client_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) WITH ( OIDS = FALSE )
  TABLESPACE pg_default;
ALTER TABLE public.orders
    OWNER to postgres;
GRANT ALL ON TABLE public.orders TO postgres;
GRANT ALL ON TABLE public.orders TO restapi;
DROP TABLE public.dishes_in_order;
CREATE TABLE public.dishes_in_order
(
    dish_id  integer NOT NULL,
    order_id integer NOT NULL,
    count    integer,
    CONSTRAINT dishes_in_order_pkey PRIMARY KEY (dish_id, order_id),
    CONSTRAINT dishes_in_order_dishid_fkey FOREIGN KEY (dish_id) REFERENCES public.dishes (dish_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT dishes_in_order_orderid_fkey FOREIGN KEY (order_id) REFERENCES public.orders (order_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) WITH ( OIDS = FALSE )
  TABLESPACE pg_default;
ALTER TABLE public.dishes_in_order
    OWNER to postgres;
GRANT ALL ON TABLE public.dishes_in_order TO postgres;
GRANT ALL ON TABLE public.dishes_in_order TO restapi;
