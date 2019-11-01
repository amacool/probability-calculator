import React from "react";

export const Logo = ({ big }) =>
  big ? (
    <svg width="364" height="158" viewBox="0 0 364 158" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="363.827" height="157.743" fill="url(#pattern0)"/>
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0" transform="translate(0 -0.00307081) scale(0.00184843 0.00426331)"/>
        </pattern>
        <image id="image0" width="541" height="236"     xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAh0AAADsCAYAAADQMRRyAAAgAElEQVR4Xu2d7dkjx41FraA2kA3HEWw4DmSD2n1oi5pXHJKNi48Cqvr4L6sA3HPRzTvUSP7jH/wPAhCAAAQgAIFRBP7rv//n/7IH+t9//fOP7JpqvfYB1IE5DwEIQAACEDiJQEXAuOLTFUAIHVfO8DkEIAABCEAgmUBH0PgkYWUAIXQkLxLlIAABCEAAAq8EJoWMzvBB6ODZgAAEIAABCBQQ2CFovMqu/tWD0FGwaJSEAAQgAIH7EtgxbKwKH4SO+z4XKIcABCAAgSQCJwSNFcGD0JG0cJSBAAQgAIH7ETgxbPx0MfsftxA67veMoBgCEIAABIIETg8bVcGD0BFcPK5DAAIQgMB9CNwpbFQED0LHfZ4VlEIAAhCAgJPAXcNGdvAgdDgXkGsQgAAEIHA+AcLGL48z/n4HoeP8ZwaFEIAABCAgEiBsvAcWDR6EDnEROQ4BCEAAAucSIGxcexsJHoSOa76cgAAEIACBwwkQNuwGEzrsrDgJAQhAAAIQ+IsAYcO3DN7gwS8dPt7cggAEIACBzQkQOPwGEjr87LgJAQhAAAI3IkDYyDHbEzz4pSOHPVUgAAEIQGA4AcJGrkGEjlyeVIMABCAAgUMIEDjyjSR05DOlIgQgAAEIbEyAsFFrnho8+McrtX5QHQIQgAAEmggQOOrBEzrqGdMBAhCAAAQGEyBsrDOH0LGONZ0gAAEIQGAYAQLHWkMIHWt50w0CEIAABAYQIGz0maAED/5OR59PdIYABCAAgQQCBI4EiIEShI4APK5CAAIQgMA+BAgc/V4ROvo9YAIIQAACECgkQNgohCuWJnSIwDgOAQhAAAL7ECBwzPKK0DHLD6aBAAQgAIEEAoSNBIgFJQgdBVApCQEIQAACfQQIHH3srzoTOq4I8TkEIAABCGxDgMAx3ypr8OBfmZ3vJRNCAAIQuC0BAsce1hM69vCJKSEAAQhA4A0BwsZea0Ho2MsvpoUABCAAgT8JEDj2WwVCx36eMTEEIACB2xMgcOy5AoSOPX1jaghAAAK3JEDY2Nt2Qsfe/jE9BCAAgdsQIHDsbzWhY38PUQABCEDgeAIEjjMsJnSc4SMqIAABCBxLgMBxjrWEjnO8RAkEIACB4wgQOM6ylNBxlp+ogQAEIHAMAQLHMVb+W4g1cDzO8l8kPct71EAAAhAYS4CwMdaa0GCEjhA+LkMAAhCAQDYBAkc20Tn1CB1zvGASCEAAArcnQOA4ewUIHWf7izoIQAAC2xAgcGxjlXtQQocbHRchAAEIQCCLAIEji+TsOoSO2f4wHQQgAIHjCRA4jrf4L4GEjvt4jVIIQAAC4wgQOMZZUjoQoaMUL8UhAAEIQOATAQLH/XaD0HE/z1EMAQhAoJ0AgaPdguUDKIHjMRz/cbDlFtEQAhCAwHkECBzneWpRROiwUOIMBCAAAQikECBspGDctgihY1vrGBwCEIDAXgQIHHv5VTEtoaOCKjUhAAEIQOBvBAgcLMSDAKGDPYAABCAAgVICBI5SvNsUVwPHQxh/kXQbexkUAhCAQD8BAke/B1MmIHRMcYI5IAABCBxIgMBxoKkBSYSOADyuQgACEIDAZwIEDrbjlQChg52AAAQgAIF0AgSOdKRHFCR0HGEjIiAAAQjMIUDgmOPFpEk8geMxP3+RdJKLzAIBCEBgEIGMwKF+OWX0HITw2FFUX58gCB3HrgTCIAABCPgJqF/+3i8hy4TqLJaanIkR8PpN6Ihx5zYEIACBIwlYvui9XzwRYJa5IvW5e00g4juh45ovJyAAAQjcisC3L/bIF042RAJINlFbvcgOLAsdWcsREWvDaT+laJo0t13h55Od2pXeGVqVGtN9nszuwXk6P2UXdj37aUemezN9t3fdh3dzR3ahLHSsWoCI+OgSKBo754zqfHe/U7vSu0K7p+YU/3dkRxjxbJzvzrv9mLK7VkW77rhV34RzkZ1IDR0TzI7AUM1U9K6cS9XhOd+pXent0bbiTtc+nMCOEFKzoa+70bWjGepO2fMMFtk1onuREjomGhwFYzFK0b1iHsvMWWc6tSu9s/RW1Vm9FyexI3zkbeXPvVi9k3kqfq902r5XsrLWju5HKHTsYmgU0iczFP1VM1gXJftcp3ald7buqnqr9uNEdoSP2FaeGjh+Ujl172PO+25H31Wu0LGrgVFYrxYpHLJ7+9Yl71andqV3nuI1lar35GR2hA99R5/7ULF3kV2bNo9O9swbGb7IoSOySFNsyAD30KKwyOo5hWGndqX3FF7KHJW7cjo7goeyaf95h2XtW+Vu7TCjRn7P0xk+SKGjcqlWW5ABT+GR0W81o2/9OrUrvScxU2ep2Jm7sCN8qNvmO9+xT9HnomNmH915t6LsH4rMoeNEo6IAFSbRXtPWr1O70nsaN3We7L25EzuCh7pt9vMT9ij6bEzQYCfefzLK+6nAFDpONCcDoMIlo1//2v2aoFO70nsSM+8smbtzN3YED+/Wvb83cX8iz8dEPbmO5VWLcP45xWXoONWUDIAKm4x+eesTr9SpXekdVzqjQtb+3JEdwSO+wzvsjfcZ2UFb3MF4BS/f185fQ0e2Gd6hp8zxCk+Zy6s9vio1FTq1d/a20lRmtNTM2h9lrqyeFn2RZ8tav1OPdcaJ55SdmTC/x+fdNK7m7GH6acby0JE57FNEdEGyZlLmyOq5etk+9evU3tnbw1+Z91v9jB1SZsno5+FVFUCm6MlgsqKGsisr5lF6eLzeWa/CxnPWw1MOHVEDMof8BskzZ9ZsSu+snp6FqbjTqb2zd4SlMvenPtE9UmaI9oqwygi772pM1FTBKVpT2ZNor6r7qtcnaK5gqXK8muHjLx1eA7IHvBLw83PLzJnzWfo958vsqzCpOtupvbN3Bk9l/td+0T1Sekd7ZbCqCB+TdVUys9ZWdsRas/Oc4vdp2jO4K/ws/d6GDi/47OEsAt6d+TZ/5owKp8y+Xi6Z9zq1d/buYvizb2SXTmH34KFoyeKX6f/EWl6mE7V4PT+VgdejyPvmXc+00JE9mBfQt18+smdUljO7dwafSI1O7Z29I8zUgPypV2SXTmJH8MjdRmU3cjuvqaY8N6ezsBJXmFlrHh06nhCeC5QNUFnM7N5Wg6vOdWrv7F3BU9Hz7O/dJ6WXt0cFo281FU1Rfqu1rernYbhqtsw+1p2+C48rtlZeV3V+fp4SOioGU0R0nVUW8zRGndo7e1ftmqLpMYN3n5Q+3h5VjDKDx07aqnkqO1E9y4r6Vu/vxuWVvZWT6hmhQyX247yylFUGBsYPXe3U3tk7BO3LZUUToeM9yFUMq3ago67KrGPG7J7Ku/iOfKp/DfwtdKiQFQOzl6e7nsLqNE6d2jt7V+6cossbPJQeu+2sos3Lr9L/aG31HyOrvKLzTbpv3W0Y5btG6AgwVRbSuuSBcZZe7dTe2bsacrW26vrVfK7qn67vm/6Hdut7RuF0xXzXz2H12TkrG4/3hA4PtT/vKA9upYkBCe6rndo7e7uBGS9Wa6uub5RZdux0fZ/A8SuHb6Us72Vlp3xTzLtl4eKdmtDhJSf+dwIqTQxIcF9VHsRs7Z293cCMF6u1Vdc3yiw9dgeNPwESOPzrZH03KTvln2bGTSsT77Th0PFoXD2kV1z1PWURT2PUqb2zd/VOPepX6qusvYKNpccdND45/NRqfccofCy8dz9j4XYnZhYeEc/5t1cC9JRFrDYyIMN1tVN7Z28XLPFSpb7K2qLMsuN30PgunFreMQqbMoOGFbZwU/8wMEyieRwrC3PBNwcJHQF6ygO8wsyAFPlqp/bO3jIox4VKfZW1HVJLrtxB4+uXoOX9onApMWZwUfj9xxwLh6iNKaFj1bBRsdn3lYd4hZnZ+r7V69Te2XsF40p9lbVXsLH0uKNGy/tF4WLhfNIZC7/Tf+2wMoj6nhY67hg8lId4laHRhbDe79Te2dvKJ3KuUl9l7YjmzLuna3zVZ323KFwy/dilloXjyQwt+jO8TA0ddwseygKuMjRjKSw1OrV39rawiZ6p1FdZO6o7875V527P5TtdFg1WHpke7Fbrzhwt2rP8fBs6oj8jrRSQBcJTR3mQT2PSqb2zt2dP1DuV+iprqzorz1t17vZcEjoqt8b2dxqsu1U7aW71lc9BSei4yy8eyvKtNDV3Hd9X69Te2Xt3tqezU//AtNNzSeCof/os+6A8Q/UTxztYNMe7/KpQFjruEDyU5VttbOaSvKvVqb2zdzXX6i/N09lV81vhv/K8Wd4riudd+qb0vSNPi+ZMfz6GDvXh/TbUalGZgL7VUh7m0xh0au/svWK3KvVV1l7BxtLjNI3f9FjeKwoPC9/Tz1wxPYnnldYKr5eEjp+Dd4isAKeGspN0d2tXHvoduVfqq6xd9ZypdU/TSOhQNyB23vLOUHYsNk3tbYvW7Am+hg71y0UZrkOsMp/lrLJ4J+j9yaRTe2dvy15Ez1j1eXbKWvuhwVM/qj3j/kkaCRwZG6HVsOy9smNa93WnLTorprkMHZXB4ymoS3wUqLJ4u2r8xKhTe2fv6M5c3a/WVl3/St+Kz0/ReKXD8k65qrHCj9163IWrRWeFd6bQsSJ47BhAlAe6y+CKpVH3IVv7ydyrtVXXr9o3a92T9F1psTxXVzWsXO907g5cLRqrPDeHDvWLJmvgTjhXGpQHerKOK53vPu/U3tnbw0q5U62tur6iteLsKfosOizvFEudCh92r3nFdneuV/oq/ZNCR1fwmPoriLJ4nSZXLFCn9s7eFSyfNRVdjzuenVJ6eOpX8rmqrWjz8ruaIeNzqw6LP9ZaGXOfVOOK7c5cr7RV+yiHju7gMSmAKIvXbXT2InVq7+ydzXFl4FCf3d12VtkLQkfVJp9R17L76r5NIWPRVjmrK3R4X5QVQjoBKkvXOWcF907tnb0rWKphIPKFeSK7lfyq/Pe8Uy3vFMXvam071T+VrUVXtU+h0OF5UCoFrQaqPNCrZ6vkrL7ks7Wfxl3RE/2lT+mV7VvVTiqaovyqNKjPlDV4ethUatyltmX3d2Rr0VXtUUrouGv4UJZugtmZy9SpvbN3JkPPF431y+bTnCex8/KLMszeAa+Oq3eK4nWFpp1rXrH1etbJxKJpxXypoWNS+FgBWHmoV8yzYmE8HmdrP4W7ouOntxGeSs9InxW7qGjJ4lely6Plyh9PzSp9u9W9Ykvo8DtaEjp+jtO9+Jbl8eJTtFXO4Z0/cq9Te2fvCLOM5yK6Ryewi77wowyzdsAT4NXwpPidrWvnepYd2YmtRc8qv8pDR8aLNgqjCriydFUzRNl473dq7+zt5RX9gnnej+7RzuyiYeNxP8ov6v+7+4onhI4KB36vadkTr29rFPzqYtGycqaloaMzgFSAV5auov/KRXnt1am9s7eXuTLzpx4ZO6TMkdHPyyuyb5X8svRkhFCLP4rf2dp2rncSW4uWlV61hY6Kl8oVuGz4ygOd3ftKa/Xnndo7eytclTmv6mbtjzJTVs8rbZ8+V2a19OjWk/3Os+jJZmjhfMKZU9hadKz2a0zoWPUrSKYJygOd2Xf1krzr16m9s/eqL8jXPln7M5HdQ6syl2f/s/h5elftjEVTNddMHpNqXbHdheuVjg7mI0NHdQDJMkJZvKyeHUuyc+iYwisyR+buKDsbmXnS3Ux+WboyfLDoyuiTpXmXOqdwtejo8GR86HhCyX54MgxRZsro17EgGX9Ky9aucJ/EzDML7DzUft3J5heb5j+3s/bXoi2rV4buXWqcwNWiocuPbUJH9q8fGaYoD3RGv64l4ZeOHvIVO6PsbI/qvK4V/DKmy/LAoi+rV4buXWqcwNWiocuPLUNH1p8WosYoD3S0V9eC8EtHD/mqfVF2tkd5TtcqftHpsvlbdGb3jDKYfn93ppb5Oz3YNnQ8oUUeqKg5Su9or84lifzSUaFb4T6N29U8FbyyfyW80tD5eTW/iLaKvbXoregb4TD97hXT6Tyv5u/mv33oiP7qETFIWb5In+4lee3frVvpP43dt3lW7Mip7B5cV/CL7FMFe4vmir4RDpPv7s7TMn83/yNCRyR4RExSHuZIn+4lIXTUOrByN5SdrVWdV30lP+/UVdwt2qt6e1lMvrczT8vsE9gfEzq8wSNilPIwR/pMWBTvT/QVuhXu09g956ngYtF6ArsdftWIBHWLjz/PWHbpFN9VNur5nVlaZld5VJwndPzrn24G6oO8y1JcLZqiu0Kz0v9Ky8rPK1io8+/K7lXnBJZW9tXMLSyqZ7CymHxuZ46W2aewd3/hThGQ8SeKiGHKwxzpM4l3t2alfye3iX7vwu7Kt4ls3828greFxYo5rjyb/vmuHC1zT2JP6Aj+BTTlYd5tOTJeohWa78Y884UxmZ0y2y7/iEXV5PXa8pytmsWrofOehd9jvokMrbN38v3Z+7jQ4VmMiGnKEkb6TFkYRW/VF4MywwnMM72fzk6Zr2q/snirWiJ9LXu+cp6Ilo67u/KzzN3B81tPQsfCXzqmvyQty6m8uKoeiAkzWFhNPDOdnTLf9OdJ1RLZF+uztnKmiJ6Vd3dlZ517JUtLL0IHocOyJ/8+o76wqh4KZY6qGczQhh3cgZ0y49TgoWrIWBPLrnfMlaGtssau3CxzV3Lz1iZ0BEPHpC9j7xJY76kvrKqHQpmjagYrs2nndmGnzDkxeKjzZ+yJddc7ZsvQV1FjV2bWuSuYRWv+FjqeC7mzKPWhimpd3S9quue+qrHyi0CZJeqth9XkO7uwU+as3DWPl+rsnh6f7lj3vXPGTL3RWhZe01hZZo5yqbz/t9DxCndXceqSRHWq/aa9JC0LpmqMMv02kzJL5RwWbtPO7MROmXXSM6XOnbkj1n3vnDFTb6TWrqysc0fYVN79GjomPchWCJ6HKcNEtW9GTyuT6DlVW/XeKPPsxDnqk+X+buyUeav3LpuvpZ7njHXnVbaeWabe2ZWRde6p3B9z/RU6vi3gTkLVBylLm9p3wgvSspgeXdXalJmy/LWw2uHMbuyUeav37spfddarepHPrXs/aeaIXvXujnysM6ssVp83hY7nUNNFex6gLE2e3t0vScuyeXRlMf00nzJT9SwWhpPO7MhOmbnzmVLnrNwLZe8nzV3JRP0em8ZF8XQFR2+Pf4cOBe5k4YoOdQEtgD39O1+SV5qm6lHmmryvV/wrPt+VnTJ3xzOlzlfh7WtNZfcnzl/BaFcmytwV3DJryqGj4ss6Q5D3ock00ztDx0vyirlXSyZPfum4ckn/XPF1hZdWBcrcHe8oz3xW7d5zin8T5/fq/nRvVx7K3NnMKur9EV22CUC8Gipm984yJXhE5l+lQZmxwuOKB3FVzZ3ZKbOv2sVHH3WuVV6rDCbriDJT3gOTOChzRxmtuh8OHR1/qnj2jC5HlaFT57paql3mVuas8viK5dTPd2enzK9+6Xo9U2fy9vHeU5+B6XpUDqr+SUHSM7vKZ/X5tNCxOnxEH4xKM6Oz7cZy1cvdEzYrfV79sGb0U3ZzIjtl/hXPkWeeDB/VGqqXu+i64qDq/lmvm0Fk9isunZ+nh45XMZngMpcgc653Bu4wa9aM1Sxf+Spzr56t82G29D6BnaKhOhCrs1g8qjqjPgs7aav63ulioHpVtTMVdaV/ZTZjAAVmleHKDBHNFfNHZ584k8pY0RDlpc42/fwp7BQdVcFDnWHCbqjPwx00XvmymoHq0dX80z6//C+SThs4Os9qQ1cvbJSPen81z8d8CtOO+VSGK8+fwk7R8eSbvQueGVZ6/a6Xl8EOWr3aLJ6s1F+pw6K1+szH/8O36sYd9bvMXLmwK7nuwLNrxpU+KL2UXZzOTtGS/WuH2lvxaMVZr7dTdXv1KKxXaF+hQ9Fccfbj/7X9CsAVgj7V7DYTnnluKyy7fc9TnVPpJHaKluxfOzy9cxzMqxJ5Nqboj2jwkKzUvVqLR3/GnY+hQ/0ZO2OYqhpTzKxc2Cp2mT/RZs2ocJzifZb2aJ3T2Cl6MoOHp2/Uu4r70eejg0N05tfvNrVehWZ1hopdWFXza+h4DlEBeZXAaWbCMu68wnCa/3H1sQonslM0PehFd0LtF3Os/naUx6rviYw5P3mn1s7eAbV//VbUdTCFjlVLlS1zspHZS5vN7rXeJJYKu0lzV3tkqX8iO0VTxq8dnn4WbzrPVDwnUU7ZM13No/a7qmf1U+1rrTv1nBQ6dgkfO5mYtbhVCzaRpcJs4vxVXlnqnspO0RUJHp4+Fl+mnDn1ebH6puq31v3kr9pvyp5E5nCFjqnhY2cDo8sbWYJ3dyezVFhN1pHtmaXeyewUbd7g4elh8WXSmZOeGY9fqn5Pj4ffap9JOxKZJRQ6fjb2go8Mf6JxXRy9L+Gof577CqO7PtifuJ7MTtHm2XdPfc9+T7mz+7MT8UvVrvZS60/ZiYw50kLH6zCqCYqYuxhWydDz0lU8qjyrcLnLrlh5n85O0ac+A57aVl8mn9vtGcrySdWt9FVrT94Pdbay0PFuEMUU9YWgCt/1vIchLHd1m7mnEIg8d1M0ROeY/kVZ4ZGq2TKDWjPq27T7S0PHNPHMAwEIQMBCwPJlYqlzwplJX5orfFH1fptJrXXCvrxqIHSc6CqaIACBVAIrvtxSB15QrPMLdLUfqtZ386k1FljY0oLQ0YKdphCAwC4EVn/B7cLldc7qL9VuH1R9P+dV7+66A5a5CR0WSpyBAARuS6D7y25n8N4v26nMVT1PHeq9nT2/mp3QcUWIzyEAgdsSmPrld1tDBggnQMRMIHTE+HEbAhA4mACh42BzA9IIHn54hA4/O25CAAKHEyB0HG5wQB7BwweP0OHjxi0IQOBwAgSOww1OkEfw0CESOnRm3IAABG5AgNBxA5MTJBI8NIiEDo0XpyEAgZsQIHTcxOgEmQQPO0RCh50VJyEAgZsQIHDcxOhEmQQPG0xCh40TpyAAgRsRIHTcyOwkqYQOG0hCh40TpyAAgRsRIHTcyOwEqQQOO0RCh50VJyEAgRsQIHDcwOREiQQODSahQ+PFaQhA4HAChI7DDU6UR+DQYRI6dGbcgAAEDiZA6DjY3ERpBA4fTEKHjxu3IACBAwkQOA40tUASgcMPldDhZ8dNCEDgMAKEjsMMLZBD4IhBJXTE+HEbAhA4iACh4yAzC6QQOOJQCR1xhlSAAAQOIEDgOMDEQgkEjhy4hI4cjlSBAAQ2J0Do2NzAwvEJHHlwCR15LKkEAQhsTIDQsbF5haMTOHLhEjpyeVINAhDYlAChY1PjCscmcOTDJXTkM6UiBCCwGQECx2aGLRqX0JEPmtCRz5SKEIDAZgQIHZsZtmBcAkcNZEJHDVeqQgACGxEgdGxk1oJRCRx1kAkddWypDAEIbEKA0LGJUQvGJHDUQiZ01PKlOgQgMJwAgWO4QQvHI3DUwyZ01DOmAwQgMJgAoWOwOQtHI3CsgU3oWMOZLhCAwFAChI6hxiwai7CxCPSfbQgda3nTDQIQGEaA0DHMkIXjEDgWwiZ0rIdNRwhAYB4BQsc8T1ZMROBYQfn3HvzS0cOdrhCAwAACBI4BJjSMQOBogM4vHX3Q6QwBCMwgQOiY4cPKKQgcK2nzS0cvbbpDAAKjCBA6RtlRPgyBoxzxZQP+8colIg5AAAKnEiB0nOrs77oIHDO8JnTM8IEpIACBBgKEjgboDS0JHA3QP7QkdMzxgkkgAIHFBAgdi4E3tCNwNED/0pLQMcsPpoEABBYSIHQshN3QisDRAP2iJaFjnidMBAEILCJA6FgEuqENgaMBuqElocMAiSMQgMB5BAgc53n6UETYmO0roWO2P0wHAQgUESB0FIFtLEvgaIRvbE3oMILiGAQgcBYBQsdZfhI49vCT0LGHT0wJAQgkEyB0JANtLEfgaIQvtiZ0iMA4DgEInEGA0HGGjwSOvXwkdOzlF9NCAAJJBAgdSSAbyxA4GuE7WxM6nOC4BgEI7E2A0LGvf4SNfb0jdOzrHZNDAAIBAoSOALzGqwSORvgJrQkdCRApAQEI7EeA0LGfZwSO/Tx7nZjQsb+HKIAABBwECB0OaI1XCByN8BNbEzoSYVIKAhDYhwChYw+vCBt7+GSdktBhJcU5CEDgKAKEjvl2Ejjme6ROSOhQiXEeAhA4ggChY7aNBI7Z/ninI3R4yXEPAhDYngDBY56FhI15nmROROjIpEktCEBgKwKEjll2EThm+VExDaGjgio1IQCBLQgQOubYROCY40XlJISOSrrUhgAERhMgdPTbQ9jo92DlBISOlbTpBQEIjCJA6Oi1g8DRy7+jO6Gjgzo9IQCBEQQIHX02EDj62Hd2JnR00qc3BCDQSoDQsR4/YWM980kdCR2T3GAWCEBgOQGCxzrkBI51rKd2InRMdYa5IACBJQQIHfWYCRv1jHfpQOjYxSnmhAAESggQOkqw/lWUwFHLd7fqhI7dHGNeCEAgnQDBIx3pPwgb+UxPqEjoOMFFNEAAAiEChI4Qvr9dJmzksTyxEqHjRFfRBAEISAQIHRKuj4cJHDkcT65C6DjZXbRBAAJmAgQPM6rfDhI2/OzudpPQcTfH0QsBCLwlQOjQF4OwoTO7+w1Cx903AP0QgMBfBAge9mUgcNhZcfIXAUIH2wABCEDgTwKEjutVIGxcM+LEZwKEDrYDAhCAwA8CBI/360DY4DHJIEDoyKBIDQhA4CgCBI9fdhI2jlrtdjGEjnYLGAACEJhGgNDxD/7jXtOW8pB5CB2HGIkMCEAgl8Bdgwe/bOTuEdX+ToDQwUZAAAIQ+EDgTsGDsMFjsIIAoWMFZXpAAALbEjg9eBA2tl3NLQcndGxpG0NDAAIrCZwYPAgbKzeIXk8ChA52AQIQgICBwAnBg6BhMJojpQQIHaV4KQ4BCJxGYLfwQdA4bQP31kPo2Ns/pocABBoI7BA8CBsNi0HLSwKEjktEHIAABCDwnsCk8EHIYEt3IEDo2MElZoQABFeNZw4AAAAnSURBVMYT6AggBI3xa8GALwQIHawEBCAAgWQCFQGEgJFsEuVaCPw/O6UBzne0NgkAAAAASUVORK5CYII="/>
      </defs>
    </svg>
  ) : (
    <svg width="143" height="62" viewBox="0 0 143 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="143" height="62" fill="url(#pattern0)"/>
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0" transform="translate(0 -0.00307078) scale(0.00184843 0.00426331)"/>
        </pattern>
        <image id="image0" width="541" height="236" xlinkHref="data:image/png;base64,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"/>
      </defs>
    </svg>
  )
